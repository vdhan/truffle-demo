const CONTRACT = 'ERC20Token'; // Contract for deploying
const Contract = artifacts.require(CONTRACT);

module.exports = async function (deployer) {
  await deployer.deploy(Contract);
};
