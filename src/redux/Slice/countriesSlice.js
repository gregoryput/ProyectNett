import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    country: {},
  },
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { setCountries, setCountry } = countriesSlice.actions;

export const selectCountries = (state) =>
  state.countries.countries;

export default countriesSlice.reducer;