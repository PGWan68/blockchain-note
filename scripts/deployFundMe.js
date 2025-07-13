
const {ethers, network, run} = require("hardhat");

async function main() {

    /// 部署
    const ContractFactory = await ethers.getContractFactory("FundMe");
    console.log("Contract start to deploying...");

    // 部署
    const contract = await ContractFactory.deploy(300);

    // 等待部署完成
    await contract.waitForDeployment();

    console.log("Deployed success, contract address:" ,contract.target);

    // 验证合约
    // await _verifyContract(contract);

    /// 获取账户（需要在config中配置两个账户的私钥）
    const [firstAccount, secondAccount] = await ethers.getSigners();

    console.log(`2 accounts are ${firstAccount.address} and ${secondAccount.address}`);


    // 账号1的存款操作
    const fundTx1 = await contract.fund({value: ethers.parseEther("0.001")});
    await fundTx1.wait();

    const balance1 = await ethers.provider.getBalance(contract.target);
    console.log(`Balance of the contract is ${ethers.formatEther(balance1)} ETH`);

    // 账号2
    const fundTx2 = await contract.connect(secondAccount).fund({value: ethers.parseEther("0.001")});
    await fundTx2.wait();

    const balance2 = await ethers.provider.getBalance(contract.target);
    console.log(`Balance of the contract is ${ethers.formatEther(balance2)} ETH`);


    // check mapping 
    const amount1 = await contract.fundersToAmount(firstAccount.address);
    const amount2 = await contract.fundersToAmount(secondAccount.address);
    console.log(`Balance of first account ${firstAccount.address} is ${ethers.formatEther(amount1)}`);
    console.log(`Balance of second account ${secondAccount.address} is ${ethers.formatEther(amount2)}`);
}


async function _verifyContract(contract){

    try{
        // 只有Sepolia网络才去验证
        if(process.env.ETHERSCAN_API_KEY && network.config.chainId == 11155111) {
            console.log("Waiting for 5 confirmations");

            // 因为区块延时问题，等待一定区块后再去验证合约
            await contract.deploymentTransaction().wait(5);

            // 验证合约
            await run("verify:verify", {
                address: contract.target,
                constructorArguments: [300],
            });
        }else{
            console.log("Verifycation skiped...", network.name);
        }
    }catch(error){

        if (error.message.toLowerCase().includes("already verified")) {
            console.log("合约已验证，跳过重复验证");
        } else {
            console.error("合约验证失败:", error.message);
            console.error("请手动验证合约:", contract.target);
        }
    }



}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});