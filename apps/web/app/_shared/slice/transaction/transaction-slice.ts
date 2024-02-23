import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecpient } from "./transaction.types";
import { set } from "react-hook-form";

export interface TransactionState {
  total: number;
  paymentType: string;
  recipients: IRecpient[];
}

const initialState: TransactionState = {
  total: 0,
  paymentType: "native",
  recipients: [],
};

const transactionSlice = createSlice({
  name: "tranaction",
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setPaymentType: (state, action: PayloadAction<string>) => {
      state.paymentType = action.payload;
    },
    setRecipients: (state, action: PayloadAction<IRecpient[]>) => {
      state.recipients = action.payload;
    },
  },
});

export const { setTotal, setPaymentType, setRecipients } =
  transactionSlice.actions;
export default transactionSlice.reducer;
