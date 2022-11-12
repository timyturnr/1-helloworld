require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    hardhat:{
      chainId: 1337
    },
    goerli:{
      url: process.env.GOERLI,
      accounts: [process.env.ACCOUNT1]
    }
  }
};
