
const { task  } = require("hardhat/config");

task("deploy-fundme", "Deploy FundMe Contract Task").setAction(async(taskArg, hre)=>{

    const ContractFactory = await ethers.getContractFactory("FundMe");
    console.log("Contract start to deploying...");

    // 部署
    const contract = await ContractFactory.deploy(300);

    // 等待部署完成
    await contract.waitForDeployment();

    console.log("Deployed success, contract address:" ,contract.target);

    // 验证合约
    await _verifyContract(contract);
});



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


module.exports = {};






