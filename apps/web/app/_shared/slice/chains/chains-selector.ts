import { RootState } from "@/shared/lib/redux-store";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: RootState) => state.chains;

export const selectChains = createSelector(selectSelf, (chains) => {
  console.log("CHAINS");
  return chains;
});
