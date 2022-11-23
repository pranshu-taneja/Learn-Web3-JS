// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract demo{
    uint public variable=9;                 //read successfully btw using web3

    function x(uint val) public{            //not able to process the write functionality till now 
        variable = val;
    }
    
}