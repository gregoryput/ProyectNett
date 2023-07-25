import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Api/AuthApi";
import authReducer from "./Slice/authSlice";
import { clientsApi } from "./Api/clientsApi";
import clientsReducer from "./Slice/clientsSlice";
import { citiesApi } from "./Api/citiesApi";
import citiesReducer from "./Slice/citiesSlice";
import { sexesApi } from "./Api/sexesApi";
import sexesReducer from "./Slice/sexesSlice";
import { countriesApi } from "./Api/countriesApi";
import countriesReducer from "./Slice/countriesSlice";
import { companiesApi } from "./Api/companiesApi";
import companiesReducer from "./Slice/companiesSlice";


export const store = configureStore({
  reducer: {
    //Autenticacion y usuarios
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    //Clientes
    clients: clientsReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,

    //Ciudades
    cities: citiesReducer,
    [citiesApi.reducerPath]: citiesApi.reducer,

    //Sexos
    sexes: sexesReducer,
    [sexesApi.reducerPath]: sexesApi.reducer,

    //Paises
    countries: countriesReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,

    //Empresas
    companies: companiesReducer,
    [companiesApi.reducerPath]: companiesApi.reducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(clientsApi.middleware)
      .concat(citiesApi.middleware)
      .concat(sexesApi.middleware)
      .concat(countriesApi.middleware)
      .concat(companiesApi.middleware),
});

export default store;
