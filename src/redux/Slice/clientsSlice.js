import { createSlice } from "@reduxjs/toolkit";

export const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    client: {},
  },
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setClients, setClient } = clientsSlice.actions;

export const selectClients = (state) =>
  state.clients.clients;

export default clientsSlice.reducer;