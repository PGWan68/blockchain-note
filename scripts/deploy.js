
const {ethers} = require("hardhat");

async function main() {

    // 部署对象
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const ContractFactory = await ethers.getContractFactory("Token");
    // 部署
    const contract = await ContractFactory.deploy();

    // 等待部署
    contract.waitForDeployment();

    console.log("Deployed Success, Contract address:" ,contract.target);

}


main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(1);
});