
// const { ethers } = require("hardhat");
const {task} = require("hardhat/config");

task("interact-fundme", "Interact Fundme Contract")
    .addParam("addr")
    .setAction(async(taskArg, hre)=> {

        const fundMeFactory = await ethers.getContractFactory("FundMe");
        const contract = fundMeFactory.attach(taskArg.addr)

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

});


module.exports = {}