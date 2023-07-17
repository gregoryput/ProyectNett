import { createSlice } from "@reduxjs/toolkit";

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    company: {},
  },
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
  },
});

export const { setCompanies, setCompany } = companiesSlice.actions;

export const selectCompanies = (state) =>
  state.companies.companies;

export default companiesSlice.reducer;