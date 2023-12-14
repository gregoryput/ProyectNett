import { createSlice } from "@reduxjs/toolkit";

export const personaSlice = createSlice({
  name: "Personas",
  initialState: {
    ListaPersonas: [],
    Persona: {},
  },
  reducers: {
    setPersonas: (state, action) => {
      state.ListaPersonas = action.payload;
    },
    setPersona: (state, action) => {
        state.Persona = action.payload;
      },
  },
});

export const { setPersonas, setPersona } = personaSlice.actions;

export const selectPersonas = (state) => state.ListaPersonas.ListaPersonas;
export const selectPersona = (state) => state.Persona.Persona;

export default personaSlice.reducer;
