import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "@/shared/slice/transaction/transaction-slice";
import chainsSlice from "@/shared/slice/chains/chains-slice";
import { rootApi } from "./root-api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
      transaction: transactionSlice,
      chains: chainsSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rootApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
