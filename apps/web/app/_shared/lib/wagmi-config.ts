import { http, createConfig } from "wagmi";
import { mainnet, sepolia, localhost } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [localhost, sepolia, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
});
