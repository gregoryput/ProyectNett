import { createSlice } from "@reduxjs/toolkit";

export const uqVerificarSlice = createSlice({
  name: "existe",
  initialState: {
    existe: [],
    exist: {},
  },
  reducers: {
    setExiste: (state, action) => {
      state.existe = action.payload;
    },
    setExist: (state, action) => {
      state.exist = action.payload;
    },
  },
});

export const { setExiste, setExist } = uqVerificarSlice.actions;

export const selectExiste = (state) =>
  state.existe.existe;

export default uqVerificarSlice.reducer;