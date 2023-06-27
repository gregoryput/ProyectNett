import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Api/AuthApi";
import usersReducer from "./authSlice";
import inforuserReducer from "./inforUserSlice";

export const store = configureStore({
  reducer: {
    auth: authApi.reducer,
    users: usersReducer,
    [authApi.reducerPath]: authApi.reducer, // Agrega el reducer de authApi utilizando authApi.reducerPath como nombre de propiedad
    inforuser:  inforuserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;




