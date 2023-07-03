import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "infouser",
  initialState: {
    nombreusuario: [],
    rol: [],
  },
  reducers: {
    informacion: (state, action) => {
      const {nombreusuario , rol} = action.payload
      state.nombreusuario = nombreusuario;
      state.rol = rol;
     
    },
  },
});

export const { informacion } = Slice.actions;

export default Slice.reducer;