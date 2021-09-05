const path = require("path");
require('dotenv').config({path: "./.env"});
const HDWalletProvider = require('@truffle/hdwallet-provider');
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    bscTestnet: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`, AccountIndex)
      },
      network_id: 97,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
