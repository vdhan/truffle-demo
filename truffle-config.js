const HDWalletProvider = require('@truffle/hdwallet-provider');
const {mnemonic, alchemy, etherscan, coinMarketCap} = require('./env.json');

module.exports = {
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: etherscan
  },

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
      provider: () => new HDWalletProvider(mnemonic, `https://eth-mainnet.g.alchemy.com/v2/${alchemy}`),
      network_id: 1,
      skipDryRun: true
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
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'VND',
      token: 'ETH',
      coinmarketcap: coinMarketCap
    }
  }
};
