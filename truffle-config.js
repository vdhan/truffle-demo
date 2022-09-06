const HDWalletProvider = require('@truffle/hdwallet-provider');
const {mnemonic, alchemy} = require('./env.json');

module.exports = {
  plugins: ['truffle-plugin-verify'],

  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },

    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://eth-goerli.g.alchemy.com/v2/${alchemy}`),
      network_id: 5,
      skipDryRun: true,
      confirmations: 5
    },

    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      production: true
    },
  },

  compilers: {
    solc: {
      version: '0.8.16',
      settings: {
        optimizer: {
          enabled: true
        }
      }
    }
  }
};
