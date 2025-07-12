// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Token{

    uint256 public totalSupply = 1000000;

    mapping(address => uint256) balances;

    address public owner;


    constructor(){
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }



    function balanceOf(address account) view external returns(uint256){
        return balances[account];
    }

    function transfer(address to, uint256 amount) external {
        
        require(balances[msg.sender] >= amount, "Not enough tokens");

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }




}
