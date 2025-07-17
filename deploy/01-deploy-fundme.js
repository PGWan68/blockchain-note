module.exports = async({getNamedAccounts, deployments}) => {
    const {firstAccount} = await getNamedAccounts();
    const {deploy} = deployments;

    console.log("开始部署FundMe合约");
    console.log("部署账户为 " + firstAccount);


    // 部署合约
    await deploy("FundMe", {
        from: firstAccount,
        args: [180],
        log: true,
        // waitConfirmations: 5
    });

    console.log("FundMe合约部署成功");
}

// tag是为了测试的时候可以调用对应的合约，提前部署好，然后拿到对象去测试
module.exports.tags = ["all", "fundme"]