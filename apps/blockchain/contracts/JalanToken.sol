// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JalanToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("JalanToken", "JJL") {
        _mint(msg.sender, initialSupply);
    }
}
