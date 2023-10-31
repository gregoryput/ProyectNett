import { createSlice } from "@reduxjs/toolkit";

export const unitsOfMeasurementsSlice = createSlice({
  name: "UnitsOfMeasurements",
  initialState: {
    UnitsOfMeasurements: [],
    UnitOfMeasurement: {},
  },
  reducers: {
    setUnitsOfMeasurements: (state, action) => {
      state.UnitsOfMeasurements = action.payload;
    },
    setUnitOfMeasurement: (state, action) => {
      state.UnitOfMeasurement = action.payload;
    },
  },
});

export const { setUnitsOfMeasurements, setUnitOfMeasurement } = unitsOfMeasurementsSlice.actions;

export const selectUnitsOfMeasurements = (state) =>
  state.UnitsOfMeasurements.UnitsOfMeasurements;

export default unitsOfMeasurementsSlice.reducer;