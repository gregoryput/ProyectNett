import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICiudad, IResponseApi } from "../../interfaces";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const citiesApi = createApi({
  reducerPath: "citiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Cities"],
  endpoints: (builder) => ({
    getCities: builder.query<IResponseApi<ICiudad>, number>({
      query: (idPais: number) => `/Ciudades/ObtenerCiudades?idPais=${idPais}`,
      providesTags: ["Cities"],
    }),
  }),
});

export const { useGetCitiesQuery } = citiesApi;
