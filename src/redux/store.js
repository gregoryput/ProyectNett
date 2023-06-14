import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Api/AuthApi";
import usersReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
    [authApi.reducerPath]: authApi.reducer
});

export default store; 