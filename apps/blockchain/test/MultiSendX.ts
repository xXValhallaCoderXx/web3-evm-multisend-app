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
    const { contract } = await loadFixture(deployContract);
  });

  it("send a multi transfer", async function () {
    // Load the contract instance using the deployment function
    const { contract } = await loadFixture(deployContract);

    const [walletOne, walletTwo, walletThree, walletFour] =
      await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const walletTwoBalance = await publicClient.getBalance({
      address: walletTwo.account.address,
    });
    const walletThreeBalance = await publicClient.getBalance({
      address: walletThree.account.address,
    });

    const walletFourBalance = await publicClient.getBalance({
      address: walletFour.account.address,
    });

    console.log("WALLET TWO BALANCE: ", formatEther(walletTwoBalance));

    const { request } = await publicClient.simulateContract({
      account: walletTwo.account,
      address: contract.address,
      abi: contract.abi,
      functionName: "sendEther",
      value: parseEther("10"),
      args: [
        walletThree.account.address,
        parseEther("1"),
      ],
    });
    await walletTwo.writeContract(request);

    // await walletTwo.writeContract({
    //   address: contract.address,
    //   abi: contract.abi,
    //   functionName: "multiSendEth",
    //   args: [
    //     [walletThree.account.address, walletFour.account.address],
    //     [1n, 2n],
    //   ],
    // });

    const walletTwoBalanceAfter = await publicClient.getBalance({
      address: walletTwo.account.address,
    });
    const walletThreeBalanceAfter = await publicClient.getBalance({
      address: walletThree.account.address,
    });

    // const walletFourBalanceAfter = await publicClient.getBalance({
    //   address: walletFour.account.address,
    // });

    console.log(
      "WALLET TWO BALANCE AFTER: ",
      formatEther(walletTwoBalanceAfter)
    );
    console.log(
      "WALLET THREE BALANCE AFTER: ",
      formatEther(walletThreeBalanceAfter)
    );
    // console.log(
    //   "WALLET FOUR BALANCE AFTER: ",
    //   formatEther(walletFourBalanceAfter)
    // );
  });
});
