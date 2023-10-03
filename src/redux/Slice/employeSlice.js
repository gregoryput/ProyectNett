import { createSlice } from "@reduxjs/toolkit";

export const employeSlice = createSlice({
  name: "employes",
  initialState: {
    employes: [],
    employe: {},
  },
  reducers: {
    setEmployes: (state, action) => {
      state.employes = action.payload;
    },
    setEmploye: (state, action) => {
      state.employe = action.payload;
    },
  },
});

export const { setEmployes, setEmploye } = employeSlice.actions;

export const selectEmploye= (state) =>
  state.employe.employes;

export default employeSlice.reducer;