
const {network} = require("hardhat");
const { devChains, networkConfig, LOCK_TIME, WAIT_CONFIRMATIONS } = require("../constants");


module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts();
    const {deploy} = deployments;

    console.log("开始部署FundMe合约");
    console.log("部署账户为 " + firstAccount);

    let dataFeedAddr;
    let waitConfirmations;

    // 本地Mock的数据
    if(devChains.includes(network.name)){
        dataFeedAddr = (await deployments.get("MockV3Aggregator")).address;
        waitConfirmations = 0;
    }else{
        dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed;
        waitConfirmations = WAIT_CONFIRMATIONS;
    }

    // 部署合约
    const fundme = await deploy("FundMe", {
        from: firstAccount,
        args: [LOCK_TIME, dataFeedAddr],
        log: true,
        waitConfirmations: waitConfirmations
    });

    console.log("FundMe合约部署成功");

    // 验证合约
    if(process.env.ETHERSCAN_API_KEY && network.config.chainId == 11155111) {
        // 验证合约
        await hre.run("verify:verify", {
            address: fundme.address,
            constructorArguments: [LOCK_TIME, dataFeedAddr],
        });  

        console.log("FundMe合约验证成功");

    }else{
        console.log(`本地网络: ${network.name}，跳过验证`);
    }

}


// tag是为了测试的时候可以调用对应的合约，提前部署好，然后拿到对象去测试
module.exports.tags = ["all", "fundme"]