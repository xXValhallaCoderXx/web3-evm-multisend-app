import { http, createConfig } from "wagmi";
import { mainnet, sepolia, goerli } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [goerli.id]: http(),
  },
});
