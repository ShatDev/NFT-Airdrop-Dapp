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
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://rinkeby.infura.io/v3/bff6ddfbc539450c8bda156c8a71484c', AccountIndex)
      },
      skipDryRun: true,
      network_id: 4,
    },
    avalanche_c_chain: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://api.avax.network/ext/bc/C/rpc')
      },
      skipDryRun: true,
      network_id: 1
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
