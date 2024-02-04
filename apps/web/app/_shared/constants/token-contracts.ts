interface IToken {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
}

export const TOKEN_CONTRACTS: any = {
  1337: [
    {
      name: "MFT",
      address: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      decimals: 18,
      symbol: "MFT",
    },
    {
      name: "MTP",
      address: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
      decimals: 18,
      symbol: "MTP",
    },
    {
      name: "MTL",
      address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
      decimals: 18,
      symbol: "MTL",
    },
  ],
};
