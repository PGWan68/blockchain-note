
const { network } = require("hardhat");
const { DECIMAL, INITIAL_ANSWER, devChains } = require("../constants");

module.exports = async({getNamedAccounts, deployments}) => {
    
    if(devChains.includes(network.name)){
        const {firstAccount} = await getNamedAccounts();
        const {deploy} = deployments;

        console.log("开始部署Mock合约");
        console.log("Mock账户为 " + firstAccount);

        // 部署合约
        await deploy("MockV3Aggregator", {
            from: firstAccount,
            args: [DECIMAL, INITIAL_ANSWER],
            log: true,
        });

        console.log("Mock合约部署成功");
    }else{
        console.log("当前不是本地环境，跳过Mock数据");
    }


}

module.exports.tags = ["all", "mock"]