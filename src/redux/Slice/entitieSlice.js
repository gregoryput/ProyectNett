import { createSlice } from "@reduxjs/toolkit";

export const entitiesSlice = createSlice({
  name: "entities",
  initialState: {
    entities: [],
    entitie: {},
  },
  reducers: {
    setEntities: (state, action) => {
      state.clients = action.payload;
    },
    setEntitie: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setEntities, setEntitie } = entitiesSlice.actions;

export const selectEntitie = (state) => state.clients.clients;

export default entitiesSlice.reducer;
