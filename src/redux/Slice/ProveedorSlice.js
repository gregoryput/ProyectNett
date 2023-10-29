import { createSlice } from "@reduxjs/toolkit";

export const ProveedorSlice = createSlice({
  name: "proveedor",
  initialState: {
    proveedores: [],
    proveedor: {},
  },
  reducers: {
    setProveedores: (state, action) => {
      state.proveedores = action.payload;
    },
    setProveedor: (state, action) => {
      state.proveedor = action.payload;
    },
  },
});

export const { setProveedores: setProveedores, setProveedor: setProveedor } = ProveedorSlice.actions;

export const selectProveedores = (state) =>
  state.proveedores.proveedore;

export default ProveedorSlice.reducer;