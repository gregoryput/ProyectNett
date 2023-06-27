import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Api/AuthApi";
<<<<<<< HEAD
import usersReducer from "./authSlice";
import inforuserReducer from "./inforUserSlice";

export const store = configureStore({
  reducer: {
    auth: authApi.reducer,
    users: usersReducer,
    [authApi.reducerPath]: authApi.reducer, // Agrega el reducer de authApi utilizando authApi.reducerPath como nombre de propiedad
    inforuser:  inforuserReducer,
=======
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
>>>>>>> 2cc2a7fd55a550a5a13ed328b3119d4a707eb73a
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
