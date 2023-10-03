import { createSlice } from "@reduxjs/toolkit";

export const cargoSlice = createSlice({
  name: "cargos",
  initialState: {
    cargos: [],
  },
  reducers: {
    setCargos: (state, action) => {
      state.cargos = action.payload;
    },
  },
});

export const { setCities, setCitie } = cargoSlice.actions;

export const selectCargos = (state) =>
  state.cargos.cargos;

export default cargoSlice.reducer;