/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const {ALCHEMY_API_URL, SEPOLIA_PRIVATE_KEY} = process.env;

module.exports = {
  solidity: "0.8.28",
  // 默认部署网络
  // defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};
