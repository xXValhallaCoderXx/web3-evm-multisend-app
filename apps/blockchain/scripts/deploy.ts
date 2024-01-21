import hre from "hardhat";
// @ts-ignore
import { parseEther } from "viem";
async function main() {
  // @ts-ignore
  const contract = await hre.viem.deployContract("MultiSendX");
  console.log(`Multisend Contract deployed to ${contract.address}`);

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
      tokenName: "MantapToken",
      tokenSymbol: "MTP",
    },
    {
      tokenName: "MantulToken",
      tokenSymbol: "MTL",
    },
  ];

  const amounts = [parseEther("1000"), parseEther("1000"), parseEther("1000")];

  for (let i = 0; i < erc20Tokens.length; i++) {
    const { tokenName, tokenSymbol } = erc20Tokens[i];
    // @ts-ignore
    const token = await hre.viem.deployContract("TokenFactory", [
      tokenName,
      tokenSymbol,
      accounts,
      amounts,
    ]);

    console.log(`Token: ${tokenName} -  deployed to ${token.address}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
