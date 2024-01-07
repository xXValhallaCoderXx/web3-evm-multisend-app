//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

contract MultiSendX is Ownable {
    IERC20 public token;
    receive() external payable {} // The contract can now receive Ether from other EOAs and Smart Contracts

    event NativeTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    function multiSendEth(
        address[] memory recipients,
        uint256[] memory values
    ) external payable {
        require(
            recipients.length == values.length,
            "Recipients and values length mismatch"
        );

        for (uint256 i = 0; i < recipients.length; i++) {
            // Cast the non-payable address to a payable address
            address payable recipientPayable = payable(recipients[i]);
            console.log("INDEX ", recipientPayable);
            console.log("RECIPIENT", recipients[i]);
            console.log("SENDER", msg.sender);
            console.log("VALUE", values[i]);
            payable(recipientPayable).transfer(values[i]);
            // Transfer Ether to the recipient
            // bool sent = recipientPayable.send(values[i]);
            // require(sent, "Failed to send Ethessssr");
        }

        uint256 balance = address(this).balance;
        if (balance > 0) {
            // Cast msg.sender to a payable address
            address payable senderPayable = payable(msg.sender);
            // Transfer any remaining balance back to the sender
            // senderPayable.transfer(balance);
            bool sent = senderPayable.send(balance);
            require(sent, "Failed to send Ether");
        }
    }
}
