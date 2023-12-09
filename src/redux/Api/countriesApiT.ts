import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPais, IResponseApi } from "../../interfaces";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Countries"],
  endpoints: (builder) => ({
    getCountries: builder.query<IResponseApi<IPais>, void>({
      query: () => "/Paises/ObtenerPaises",
      providesTags: ["Countries"],
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
