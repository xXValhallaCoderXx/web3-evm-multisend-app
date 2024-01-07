import { http, createConfig } from "wagmi";
import { mainnet, sepolia, goerli, localhost } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [localhost],
  transports: {
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
    // [goerli.id]: http(),
    [localhost.id]: http(),
  },
});
