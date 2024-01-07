import hre from "hardhat";
import { expect } from "chai";
import { getAddress, parseGwei, parseEther, formatEther } from "viem";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const deployContract = async () => {
  const contract = await hre.viem.deployContract("MultiSendX");
  return { contract };
};

describe("Multi Send ETH Testsuite", function () {
  it("should deploy the contract", async function () {
    // Load the contract instance using the deployment function
    await loadFixture(deployContract);
  });

  it("should send ether to a single address", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);

    const [, walletTwo, walletThree] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const walletTwoBalance = await publicClient.getBalance({
      address: walletTwo.account.address,
    });

    expect(walletTwoBalance).to.equal(parseEther("10000"));

    const { request } = await publicClient.simulateContract({
      account: walletTwo.account,
      address: contract.address,
      abi: contract.abi,
      functionName: "sendEther",
      value: parseEther("10"),
      args: [walletThree.account.address, parseEther("1")],
    });
    await walletTwo.writeContract(request);

    const walletThreeBalanceAfter = await publicClient.getBalance({
      address: walletThree.account.address,
    });

    expect(walletThreeBalanceAfter).to.equal(parseEther("10001"));
  });

  it("send a multi transfer", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);

    const [, walletTwo, walletThree, walletFour] =
      await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const { request } = await publicClient.simulateContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "multiSendEth",
      args: [
        [walletThree.account.address, walletFour.account.address],
        [1000000000000000000n, 2000000000000000000n],
      ],
      value: parseEther("10"),
    });
    await walletTwo.writeContract(request);

    const walletThreeBalanceAfter = await publicClient.getBalance({
      address: walletThree.account.address,
    });

    const walletFourBalanceAfter = await publicClient.getBalance({
      address: walletFour.account.address,
    });

    expect(walletThreeBalanceAfter).to.equal(parseEther("10001"));
    expect(walletFourBalanceAfter).to.equal(parseEther("10002"));

  });
});
