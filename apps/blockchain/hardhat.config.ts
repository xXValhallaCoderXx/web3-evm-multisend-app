import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: "0.8.23",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};

export default config;
