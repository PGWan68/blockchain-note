
const {ethers, network, run} = require("hardhat");

async function main() {


    const ContractFactory = await ethers.getContractFactory("Token");
    console.log("Contract start to deploying...");

    // 部署
    const contract = await ContractFactory.deploy();

    // 等待部署完成
    await contract.waitForDeployment();

    console.log("Deployed success, contract address:" ,contract.target);

    // 验证合约
    await _verifyContract(contract);
}


async function _verifyContract(contract){

    // 只有Sepolia网络才去验证
    if(process.env.ETHERSCAN_API_KEY && network.config.chainId == 11155111) {
        console.log("Waiting for 5 confirmations");

        // 因为区块延时问题，等待一定区块后再去验证合约
        await contract.deploymentTransaction().wait(5);

        // 验证合约
        await run("verify:verify", {
            address: contract.target,
            constructorArguments: [],
        });
    }else{
        console.log("Verifycation skiped...");
    }

    

}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});