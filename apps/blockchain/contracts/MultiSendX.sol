// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MultiSendX {
    IERC20 public token;

    event NativeTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    function multiSendEth(
        address[] calldata recipients,
        uint256[] calldata values
    ) external payable {
        require(
            recipients.length == values.length,
            "Recipients and values length mismatch"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            // Cast the non-payable address to a payable address
            address payable recipientPayable = payable(recipients[i]);
            recipientPayable.transfer(values[i]);
        }

        uint256 balance = address(this).balance;
        console.log("Balance", balance);
        if (balance > 0) {
            // Cast msg.sender to a payable address
            address payable senderPayable = payable(msg.sender);
            // Transfer any remaining balance back to the sender
            // senderPayable.transfer(balance);
            bool sent = senderPayable.send(balance);
            require(sent, "Failed to send Ether");
        }
    }

    // Function to send Ether. The `payable` keyword is important here.
    function sendEther(
        address payable recipient,
        uint256 amount
    ) external payable {
        // Check if the contract has enough balance
        require(
            address(this).balance >= amount,
            "Insufficient balance in contract"
        );

        // Send the specified amount of Ether to the recipient
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");

        uint256 balance = address(this).balance;
        if (balance > 0) {
            address payable senderPayable = payable(msg.sender);
            // Transfer any remaining balance back to the sender
            bool returnedFunds = senderPayable.send(balance);
            require(returnedFunds, "Failed to send Ether");
        }
    }

    receive() external payable {}
}
