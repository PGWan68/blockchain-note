module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts();
    const {deploy} = deployments;

    console.log("开始部署Mock合约");
    console.log("Mock账户为 " + firstAccount);

    // 部署合约
    await deploy("MockV3Aggregator", {
        from: firstAccount,
        args: [8, 300000000000],
        log: true,
    });

    console.log("Mock合约部署成功");
}

module.exports.tags = ["all", "mock"]