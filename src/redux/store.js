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
import { ConfigPerfilApi } from "./Api/configPerfilApi";
import configPerfilReducer from "./Slice/configPerfilSlice";
import { unitsOfMeasurementsApi } from "./Api/unitsOfMeasurementsApi";
import unitsOfMeasurementsReducer from "./Slice/unitsOfMeasurementsSlice";
// ---
import { productsApi } from "./Api/productsApi";
import productsReducer from "./Slice/productsSlice";

import { uQVerificarApi } from "./Api/uQVerificarApi";
import uqVerificarReducer from "./Slice/uqVerificarSlice";

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

    //Configuracion de perfil:
    perfil: configPerfilReducer,
    [ConfigPerfilApi.reducerPath]: ConfigPerfilApi.reducer,

    //Verificacion de Campos unicos:
    existe: uqVerificarReducer,
    [uQVerificarApi.reducerPath]: uQVerificarApi.reducer,

    //Productos
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,

    //Unidades de medidas
    unitsOfMeasurements: unitsOfMeasurementsReducer,
    [unitsOfMeasurementsApi.reducerPath]: unitsOfMeasurementsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(clientsApi.middleware)
      .concat(citiesApi.middleware)
      .concat(sexesApi.middleware)
      .concat(countriesApi.middleware)
      .concat(companiesApi.middleware)
      .concat(ConfigPerfilApi.middleware)
      .concat(uQVerificarApi.middleware)
      .concat(productsApi.middleware)
      .concat(unitsOfMeasurementsApi.middleware),
});

export default store;
