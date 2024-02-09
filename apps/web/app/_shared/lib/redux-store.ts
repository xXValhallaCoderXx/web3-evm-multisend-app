import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "@/shared/slice/transaction-slice";
import chainsSlice from "@/shared/slice/chains/chains-slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      transaction: transactionSlice,
      chains: chainsSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
