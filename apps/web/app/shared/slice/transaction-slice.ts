import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "tranaction",
  initialState: {
    total: 0,
    paymentType: "native",
  },
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setPaymentType: (state, action: PayloadAction<string>) => {
      state.paymentType = action.payload;
    },
  },
});

export const { setTotal, setPaymentType } = transactionSlice.actions;
export default transactionSlice.reducer;
