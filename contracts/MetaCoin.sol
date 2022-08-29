// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./ConvertLib.sol";
import "./SafeMath.sol";

interface IBEP20 {
    // return amount of tokens in existence
    function totalSupply() external view returns (uint);

    // return token decimals
    function decimals() external view returns (uint8);

    // return token symbol
    function symbol() external view returns (string memory);

    // return token name
    function name() external view returns (string memory);

    // return bep token owner
    function getOwner() external view returns (address);

    // return amount of tokens own by 'account'
    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address _owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract Context {
    constructor() internal {}

    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        this; // silence warning
        return msg.data;
    }
}

contract MetaCoin {
    constructor() {
        balances[tx.origin] = 10000;
    }

    mapping (address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint _value);

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Transfer(msg.sender, receiver, amount);
        return true;
    }

    function getBalanceInEth(address addr) public view returns(uint){
        return ConvertLib.convert(getBalance(addr),2);
    }

    function getBalance(address addr) public view returns(uint) {
        return balances[addr];
    }
}
