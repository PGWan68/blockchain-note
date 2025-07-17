/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");
require("./tasks");
require("hardhat-deploy");

const {ALCHEMY_API_URL, SEPOLIA_PRIVATE_KEY1, SEPOLIA_PRIVATE_KEY2, ETHERSCAN_API_KEY} = process.env;

module.exports = {
  solidity: "0.8.28",
  // 默认部署网络
  // defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [SEPOLIA_PRIVATE_KEY1, SEPOLIA_PRIVATE_KEY2],
      chainId: 11155111,
      timeout: 30000, // 30秒超时
    }
  },

  // 配置Account，可以使用getNamedAccounts获取不同位置的地址
  namedAccounts: {
    firstAccount: {
      default: 0,
    },
    secondAccount: {
       default: 1,
    },

  },


  etherscan:{
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },

};
