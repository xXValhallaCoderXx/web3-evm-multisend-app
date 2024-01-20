import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "tranaction",
  initialState: {
    total: 0,
  },
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export const { setTotal } = transactionSlice.actions;
export default transactionSlice.reducer;
