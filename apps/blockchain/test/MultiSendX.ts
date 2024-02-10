import hre from "hardhat";
// @ts-ignore
import { expect } from "chai";
// @ts-ignore
import { parseEther } from "viem";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

const deployContract = async () => {
  // @ts-ignore
  const contract = await hre.viem.deployContract("MultiSendX");
  return { contract };
};

const deployTokenContract = async () => {
  const [walletOne, walletTwo, walletThree] = await hre.viem.getWalletClients();
  // List of accounts to distribute tokens to
  const accounts = [
    walletOne.account.address,
    walletTwo.account.address,
    walletThree.account.address,
  ];

  const erc20Tokens = [
    {
      tokenName: "MafanToken",
      tokenSymbol: "MFT",
    },
    {
      tokenName: "Jalan Token",
      tokenSymbol: "JJL",
    },
  ];

  const amounts = [parseEther("1000"), parseEther("1000"), parseEther("1000")];

  let tokens = [];

  for (let i = 0; i < erc20Tokens.length; i++) {
    const { tokenName, tokenSymbol } = erc20Tokens[i];
    // @ts-ignore
    const deployedToken = await hre.viem.deployContract("TokenFactory", [
      tokenName,
      tokenSymbol,
      accounts,
      amounts,
    ]);
    tokens.push(deployedToken);
    console.log(`Token: ${tokenName} -  deployed to ${deployedToken.address}`);
  }
  return { tokens };
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
    const { tokens } = await loadFixture(deployTokenContract);

    if (tokens) {
      tokens.forEach((token) => console.log("Token Address:", token.address));
      const token = tokens[0];

      const [walletOne, walletTwo, walletThree] =
        await hre.viem.getWalletClients();
      const publicClient = await hre.viem.getPublicClient();

      const walletOneTokenBalance = await token.read.balanceOf([
        walletOne.account.address,
      ]);

      const walletTwoTokenBalance = await token.read.balanceOf([
        walletTwo.account.address,
      ]);

      expect(walletOneTokenBalance).to.equal(parseEther("1000"));
      expect(walletTwoTokenBalance).to.equal(parseEther("1000"));

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

      expect(walletOneTokenBalanceAfter).to.equal(parseEther("997"));
      expect(walletTwoTokenBalanceAfter).to.equal(parseEther("1001"));
      expect(walletThreeTokenBalanceAfter).to.equal(parseEther("1002"));
    }
  });

  it("sends multiple recpients & different tokens token", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);
    const { tokens } = await loadFixture(deployTokenContract);

    const [walletOne, walletTwo, walletThree] =
      await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    if (tokens) {
      const mafanToken = tokens[0];
      const jalanToken = tokens[1];

      const walletOneTokenBalance = await mafanToken.read.balanceOf([
        walletOne.account.address,
      ]);

      const walletTwoTokenBalance = await mafanToken.read.balanceOf([
        walletTwo.account.address,
      ]);

      expect(walletOneTokenBalance).to.equal(parseEther("1000"));
      expect(walletTwoTokenBalance).to.equal(parseEther("1000"));

      await walletOne.writeContract({
        address: mafanToken.address,
        abi: mafanToken.abi,
        functionName: "approve",
        args: [contract.address, parseEther("10000")],
      });

      await walletOne.writeContract({
        address: jalanToken.address,
        abi: jalanToken.abi,
        functionName: "approve",
        args: [contract.address, parseEther("10000")],
      });
      console.log("Approved Mafan Token", walletOne.account.address);
      console.log("Approved Jalan Token", walletOne.account.address);

      const { request } = await publicClient.simulateContract({
        address: contract.address,
        abi: contract.abi,
        functionName: "sendMultipleTokensToMultipleAddresses",
        args: [
          [
            {
              recipient: walletTwo.account.address,
              token: mafanToken.address,
              amount: parseEther("1"),
            },
            {
              recipient: walletThree.account.address,
              token: mafanToken.address,
              amount: parseEther("1"),
            },
            {
              recipient: walletTwo.account.address,
              token: jalanToken.address,
              amount: parseEther("10"),
            },
            {
              recipient: walletThree.account.address,
              token: jalanToken.address,
              amount: parseEther("10"),
            },
          ],
        ],
      });
      await walletOne.writeContract(request);

      const walletOneTokenBalanceAfter = await mafanToken.read.balanceOf([
        walletOne.account.address,
      ]);

      const walletTwoTokenBalanceAfter = await mafanToken.read.balanceOf([
        walletTwo.account.address,
      ]);

      const walletThreeTokenBalanceAfter = await mafanToken.read.balanceOf([
        walletThree.account.address,
      ]);

      expect(walletOneTokenBalanceAfter).to.equal(parseEther("998"));
      expect(walletTwoTokenBalanceAfter).to.equal(parseEther("1001"));
      expect(walletThreeTokenBalanceAfter).to.equal(parseEther("1001"));

      const walletOneJalanBalanceAfter = await jalanToken.read.balanceOf([
        walletOne.account.address,
      ]);

      const walletTwoJalanBalanceAfter = await jalanToken.read.balanceOf([
        walletTwo.account.address,
      ]);

      const walletThreeJalanBalanceAfter = await jalanToken.read.balanceOf([
        walletThree.account.address,
      ]);

      expect(walletOneJalanBalanceAfter).to.equal(parseEther("980"));
      expect(walletTwoJalanBalanceAfter).to.equal(parseEther("1010"));
      expect(walletThreeJalanBalanceAfter).to.equal(parseEther("1010"));
    }
  });
});
