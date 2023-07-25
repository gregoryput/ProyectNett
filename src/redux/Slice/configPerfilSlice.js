import { createSlice } from "@reduxjs/toolkit";

export const configPerfilSlice = createSlice({
  name: "configPefil",
  initialState: {
    pefil: {},
  },
  reducers: {
    setConfigPerfil: (state, action) => {
      state.pefil = action.payload;
    },
  },
});

export const { setConfigPerfil } = configPerfilSlice.actions;

export const selectClients = (state) => state.pefil.pefil;

export default configPerfilSlice.reducer;
