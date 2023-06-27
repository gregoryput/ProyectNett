import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  infoUser: null,
};

export const Slice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    setUser: (state, action) => {
      console.log("Iniciando sesion");
      const token = action.payload;
      localStorage.setItem("token", token.token);
      state.token = token;
    },
    logOut: (state) => {
      console.log("Cerrando sesión");
      state.token = null;
      localStorage.removeItem("token");
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
  },
});

export const { setUser, logOut, setInfoUser } = Slice.actions;

<<<<<<< HEAD
export default Slice.reducer;
=======
export const selectInfoUser = (state) => state.auth.infoUser;
export const selectCurrentToken = (state) => state.auth.token;

export default Slice.reducer;
>>>>>>> 2cc2a7fd55a550a5a13ed328b3119d4a707eb73a
