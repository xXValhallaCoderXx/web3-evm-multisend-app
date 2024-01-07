import hre from "hardhat";
import { expect } from "chai";
import { getAddress, parseGwei, parseEther, formatEther } from "viem";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const deployContract = async () => {
  const token = await hre.viem.deployContract("Token");
  return { token };
};

describe("JJL Token Contract Tests", function () {
  it("should deploy token with its existing supply", async function () {
    // Load the contract instance using the deployment function
    const { token } = await loadFixture(deployContract);

    // Get the initial supply
    const initialSupply = await token.read.getCurrentSupply();
    console.log(`Initial supply of MyToken: ${initialSupply}`);
  });

  it("initial supply should be given to the owner", async function () {
    // Load the contract instance using the deployment function
    const { token } = await loadFixture(deployContract);

    const [owner] = await hre.viem.getWalletClients();
    const initialTokenSupply = await token.read.getCurrentSupply();
    const ownerTokenBalance = await token.read.balanceOf([
      owner.account.address,
    ]);
    console.log("Owner token balance:", ownerTokenBalance);
    console.log("Initial token supply:", initialTokenSupply);
    expect(initialTokenSupply).to.equal(ownerTokenBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    const { token } = await loadFixture(deployContract);

    const [owner, addressOne] = await hre.viem.getWalletClients();

    const originalOwnerTokenBalance = await token.read.balanceOf([
      owner.account.address,
    ]);
    console.log("Owner token balance:", originalOwnerTokenBalance);
    // Transfer 50 tokens from owner to addr1
    const transferAmount = 100n;

    await owner.writeContract({
      address: token.address,
      abi: token.abi,
      functionName: "transfer",
      args: [addressOne.account.address, transferAmount],
    });

    const ownerTokenBalanceAfterTransfer = await token.read.balanceOf([
      owner.account.address,
    ]);
    console.log("Owner token balance after:", ownerTokenBalanceAfterTransfer);
    expect(ownerTokenBalanceAfterTransfer).to.equal(
      originalOwnerTokenBalance - 100n
    );

    const recieverTokenBalance = await token.read.balanceOf([
      addressOne.account.address,
    ]);
    console.log("Reciever token balance:", recieverTokenBalance);
    expect(recieverTokenBalance).to.equal(100n);
  });
});
