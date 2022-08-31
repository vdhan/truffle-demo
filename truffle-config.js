const HDWalletProvider = require('@truffle/hdwallet-provider');

const { mnemonic, BscScan} = require('./env.json');

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    bscscan: BscScan
  },

  networks: {
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },

    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true
    },

    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true
    },
  },

  mocha: {
    timeout: 20000
  },

  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  }
};
