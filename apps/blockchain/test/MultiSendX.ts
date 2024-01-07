import hre from "hardhat";
import { expect } from "chai";
import { getAddress, parseGwei, parseEther, formatEther } from "viem";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const deployContract = async () => {
  const contract = await hre.viem.deployContract("MultiSendX");
  return { contract };
};

const deployTokenContract = async () => {
  const contract = await hre.viem.deployContract("JalanToken", [
    parseEther("10000"),
  ]);
  return { token: contract };
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

  it("sends multiple recpients the same token", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);
    const { token } = await loadFixture(deployTokenContract);

    const [walletOne, walletTwo, walletThree] =
      await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const walletOneTokenBalance = await token.read.balanceOf([
      walletOne.account.address,
    ]);

    const walletTwoTokenBalance = await token.read.balanceOf([
      walletTwo.account.address,
    ]);

    expect(walletOneTokenBalance).to.equal(parseEther("10000"));
    expect(walletTwoTokenBalance).to.equal(parseEther("0"));

    await walletOne.writeContract({
      address: token.address,
      abi: token.abi,
      functionName: "approve",
      args: [contract.address, parseEther("10000")],
    });
    console.log("Jalan Jalan Token Address:", token.address);
    console.log("Approved", walletOne.account.address);

    const { request } = await publicClient.simulateContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "sendTokenToMultipleAddresses",
      args: [
        token.address,
        [walletTwo.account.address, walletThree.account.address],
        [1000000000000000000n, 2000000000000000000n],
      ],
    });
    await walletOne.writeContract(request);

    const walletOneTokenBalanceAfter = await token.read.balanceOf([
      walletOne.account.address,
    ]);

    const walletTwoTokenBalanceAfter = await token.read.balanceOf([
      walletTwo.account.address,
    ]);

    const walletThreeTokenBalanceAfter = await token.read.balanceOf([
      walletThree.account.address,
    ]);

    expect(walletOneTokenBalanceAfter).to.equal(parseEther("9997"));
    expect(walletTwoTokenBalanceAfter).to.equal(parseEther("1"));
    expect(walletThreeTokenBalanceAfter).to.equal(parseEther("2"));
  });

  it("sends multiple recpients & different tokens token", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);
    const { token } = await loadFixture(deployTokenContract);

    const [walletOne, walletTwo, walletThree] =
      await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const walletOneTokenBalance = await token.read.balanceOf([
      walletOne.account.address,
    ]);

    const walletTwoTokenBalance = await token.read.balanceOf([
      walletTwo.account.address,
    ]);

    expect(walletOneTokenBalance).to.equal(parseEther("10000"));
    expect(walletTwoTokenBalance).to.equal(parseEther("0"));

    await walletOne.writeContract({
      address: token.address,
      abi: token.abi,
      functionName: "approve",
      args: [contract.address, parseEther("10000")],
    });
    console.log("Jalan Jalan Token Address:", token.address);
    console.log("Approved", walletOne.account.address);

    const { request } = await publicClient.simulateContract({
      address: contract.address,
      abi: contract.abi,
      functionName: "sendMultipleTokensToMultipleAddresses",
      args: [
        [
          {
            recipient: walletTwo.account.address,
            token: token.address,
            amount: 1000000000000000000n,
          },
          {
            recipient: walletThree.account.address,
            token: token.address,
            amount: 1000000000000000000n,
          },
        ],
      ],
    });
    // await walletOne.writeContract(request);

    // const walletOneTokenBalanceAfter = await token.read.balanceOf([
    //   walletOne.account.address,
    // ]);

    // const walletTwoTokenBalanceAfter = await token.read.balanceOf([
    //   walletTwo.account.address,
    // ]);

    // const walletThreeTokenBalanceAfter = await token.read.balanceOf([
    //   walletThree.account.address,
    // ]);

    // expect(walletOneTokenBalanceAfter).to.equal(parseEther("9997"));
    // expect(walletTwoTokenBalanceAfter).to.equal(parseEther("1"));
    // expect(walletThreeTokenBalanceAfter).to.equal(parseEther("2"));
  });
});
