import { createSlice } from "@reduxjs/toolkit";

export const ProyectoSlice = createSlice({
  name: "proyectos",
  initialState: {
    listproyecto: [],
  },
  reducers: {
    setProyecto: (state, action) => {
      state.listproyecto = action.payload;
    },
  },
});

export const { setProyecto } = ProyectoSlice.actions;

export const selectProyecto = (state) =>
  state.listproyecto.listproyecto;

export default ProyectoSlice.reducer;