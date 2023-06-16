import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Api/AuthApi";
import usersReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authApi.reducer,
    users: usersReducer,
    [authApi.reducerPath]: authApi.reducer, // Agrega el reducer de authApi utilizando authApi.reducerPath como nombre de propiedad
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;




