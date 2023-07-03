import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    cities: [],
    citie: {},
  },
  reducers: {
    setCities: (state, action) => {
      state.cities = action.payload;
    },
    setCitie: (state, action) => {
      state.citie = action.payload;
    },
  },
});

export const { setCities, setCitie } = citiesSlice.actions;

export const selectCities = (state) =>
  state.cities.cities;

export default citiesSlice.reducer;