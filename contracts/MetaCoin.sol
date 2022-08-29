// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./SafeMath.sol";

interface IBEP20 {
    function totalSupply() external view returns (uint);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);

    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address _owner, address spender) external view returns (uint);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    function approve(address spender, uint amount) external returns (bool);

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

contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not owner");
        _;
    }

    constructor() internal {
        address msgSender = _msgSender();
        _owner = msgSender;

        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");

        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

// contract MetaCoin {
//     constructor() {
//         balances[tx.origin] = 10000;
//     }

//     mapping (address => uint) balances;

//     event Transfer(address indexed _from, address indexed _to, uint _value);

//     function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
//         if (balances[msg.sender] < amount) return false;
//         balances[msg.sender] -= amount;
//         balances[receiver] += amount;
//         emit Transfer(msg.sender, receiver, amount);
//         return true;
//     }

//     function getBalanceInEth(address addr) public view returns(uint){
//         return ConvertLib.convert(getBalance(addr),2);
//     }

//     function getBalance(address addr) public view returns(uint) {
//         return balances[addr];
//     }
// }
