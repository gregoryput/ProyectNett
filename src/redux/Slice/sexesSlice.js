import { createSlice } from "@reduxjs/toolkit";

export const sexesSlice = createSlice({
  name: "sexes",
  initialState: {
    sexes: [],
    sex: {},
  },
  reducers: {
    setSexes: (state, action) => {
      state.sexes = action.payload;
    },
    setSex: (state, action) => {
      state.sex = action.payload;
    },
  },
});

export const { setSexes, setSex } = sexesSlice.actions;

export const selectSexes = (state) =>
  state.sexes.sexes;

export default sexesSlice.reducer;