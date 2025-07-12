/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

const {ALCHEMY_API_URL, SEPOLIA_PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;

module.exports = {
  solidity: "0.8.28",
  // 默认部署网络
  // defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    }
  },


  etherscan:{
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },

};
