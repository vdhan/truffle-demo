const {upgradeProxy} = require('@openzeppelin/truffle-upgrades');

const CONTRACT = 'ERC20Token';
const Contract = artifacts.require(CONTRACT);

module.exports = async function (deployer) {
  const existing = await Contract.deployed();
  await upgradeProxy(existing.address, Contract, {deployer, kind: 'uups'});
};
