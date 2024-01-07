import hre from "hardhat";

async function main() {
  const contract = await hre.viem.deployContract("MultiSendX");

  console.log(`Multisend Contract deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
