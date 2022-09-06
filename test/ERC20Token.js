const {expect} = require('chai');
const {BN} = require('@openzeppelin/test-helpers');
const {deployProxy} = require('@openzeppelin/truffle-upgrades');
const Contract = artifacts.require('ERC20Token');

contract('ERC20 Token', function ([owner, addr1, addr2]) {
  beforeEach(async function () {
    this.coin = await deployProxy(Contract, {owner, kind: 'uups'});
  });

  it('Should put coins in the first account', async function () {
    const amount = new BN(1000000000000000000n);
    expect(await this.coin.balanceOf(owner)).to.be.bignumber.equal(amount);
  });

  it('Should send coin directly', async function () {
    const amount = new BN(2000);
    let balance1start = await this.coin.balanceOf(owner);
    let balance2start = await this.coin.balanceOf(addr1);
    balance1start = (balance1start - amount).toString();
    balance2start = (balance2start + amount).toString();

    await this.coin.transfer(addr1, amount);

    expect(await this.coin.balanceOf(owner)).to.be.bignumber.equal(balance1start);
    expect(await this.coin.balanceOf(addr1)).to.be.bignumber.equal(balance2start);
  });

  it('Should send coin correctly', async function () {
    const amount = new BN(1000);
    let balance1start = await this.coin.balanceOf(owner);
    let balance2start = await this.coin.balanceOf(addr2);
    balance1start = (balance1start - amount).toString();
    balance2start = (balance2start + amount).toString();

    await this.coin.increaseAllowance(owner, 5000);
    await this.coin.transferFrom(owner, addr2, amount);

    expect(await this.coin.balanceOf(owner)).to.be.bignumber.equal(balance1start);
    expect(await this.coin.balanceOf(addr2)).to.be.bignumber.equal(balance2start);
  });
});
