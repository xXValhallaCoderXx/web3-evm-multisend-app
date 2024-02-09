import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const chainsSlice = createSlice({
  name: "chains",
  initialState: {
    chains: [],
  },
  reducers: {},
});

export const {} = chainsSlice.actions;
export default chainsSlice.reducer;
