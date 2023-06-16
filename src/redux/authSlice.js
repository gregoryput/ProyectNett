import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      const { token } = action.payload;
      state.users = action.payload;
      localStorage.setItem("token", token);
      state.token = token;
      console.log(localStorage);
    },
    logOut: (state) => {
        console.log("Cerrar sesión");
        state.token = null;
        localStorage.removeItem("token");
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.users;

export default usersSlice.reducer;