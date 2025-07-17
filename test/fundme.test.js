
const { assert } = require("chai");
const { deployments, getNamedAccounts, ethers } = require("hardhat");

describe("test fundme contract", async function(){
    let firstAccount;
    let fundme;


    beforeEach(async function () {
        // 部署fundme获取对象
        await deployments.fixture(["all"])
        
        firstAccount = (await getNamedAccounts()).firstAccount;
        const fundmeDeployment = await deployments.get("FundMe");

        fundme = await ethers.getContractAt("FundMe", fundmeDeployment.address);
    })
    

    
    it("test the msg.sender is owner", async function (){
        await fundme.waitForDeployment();
        assert.equal(await fundme.owner(), firstAccount);
    });
});

