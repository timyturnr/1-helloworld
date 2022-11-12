// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Helloworld {
    string public greet;

    constructor(string memory _greet) {
        greet = _greet;
    }

    function getGreet() external view returns(string memory){
        return greet;
    }

    function setGreet(string calldata _greet) public {
        greet = _greet;
    } 

}
