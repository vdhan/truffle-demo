const {expectEvent, expectRevert, constants} = require('@openzeppelin/test-helpers');
const {deployProxy} = require('@openzeppelin/truffle-upgrades');
const Token = artifacts.require('ERC20Token');

contract('ERC20 Token', function ([owner, addr1, addr2]) {
  before(async function () {
    this.token = await deployProxy(Token, {owner, kind: 'uups'});
  });

  it("Should put coins in owner's account", async function () {
    const amount = 1000000000000000000n;

    assert.equal(await this.token.balanceOf(owner), amount);
    assert.equal(await this.token.totalSupply(), amount);
  });

  it('Should send coin directly', async function () {
    const amount = 2000n;
    const fromBalance = BigInt(await this.token.balanceOf(owner));
    const toBalance = BigInt(await this.token.balanceOf(addr1));

    await this.token.transfer(addr1, amount);

    assert.equal(BigInt(await this.token.balanceOf(owner)), fromBalance - amount);
    assert.equal(BigInt(await this.token.balanceOf(addr1)), toBalance + amount);
  });

  it('Should send coin correctly', async function () {
    const amount = 1000n;
    const fromBalance = BigInt(await this.token.balanceOf(owner));
    const toBalance = BigInt(await this.token.balanceOf(addr2));

    await this.token.increaseAllowance(owner, 5000);
    await this.token.transferFrom(owner, addr2, amount);

    assert.equal(BigInt(await this.token.balanceOf(owner)), fromBalance - amount);
    assert.equal(BigInt(await this.token.balanceOf(addr2)), toBalance + amount);
  });

  it('Mint emits an event', async function () {
    const amount = '1000';
    const mint = await this.token.mint(addr1, amount);

    expectEvent(mint, 'Transfer', {from: constants.ZERO_ADDRESS, to: addr1, value: amount});
  });

  it('Non owner can not mint', async function () {
    expectRevert.unspecified(this.token.mint(addr1, '1000', {from: addr2}));
  });
});
