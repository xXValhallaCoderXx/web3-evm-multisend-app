// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenFactory is ERC20 {
    constructor(
        string memory name, 
        string memory symbol, 
        address[] memory initialAccounts, 
        uint256[] memory initialBalances
    ) ERC20(name, symbol) {
        require(initialAccounts.length == initialBalances.length, "Accounts and balances length mismatch");

        for (uint256 i = 0; i < initialAccounts.length; i++) {
            _mint(initialAccounts[i], initialBalances[i]);
        }
    }
}