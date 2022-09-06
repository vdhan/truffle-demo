const {expect} = require('chai');
const {BN} = require('@openzeppelin/test-helpers');
const {deployProxy} = require('@openzeppelin/truffle-upgrades');
const Contract = artifacts.require('ERC20Token');

contract('MetaCoin', function ([owner, other]) {
  beforeEach(async function () {
    this.coin = await deployProxy(Contract, {owner, kind: 'uups'});
  });

  it('should put coins in the first account', async function () {
    const amount = new BN(1000000000000000000n);
    expect(await this.coin.balanceOf(owner)).to.be.bignumber.equal(amount);
  });

  it('should send coin correctly', async function () {
    const amount = new BN(1000);
    let balance1start = await this.coin.balanceOf(owner);
    let balance2start = await this.coin.balanceOf(other);
    balance1start = (balance1start - amount).toString();
    balance2start = (balance2start + amount).toString();

    await this.coin.transfer(other, amount);

    expect(await this.coin.balanceOf(owner)).to.be.bignumber.equal(balance1start);
    expect(await this.coin.balanceOf(other)).to.be.bignumber.equal(balance2start);
  });
});
