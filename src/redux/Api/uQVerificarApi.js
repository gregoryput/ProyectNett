import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

export const uQVerificarApi = createApi({
  reducerPath: "uQVerificarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  //https://localhost:7279/UQVerificar/verificarCedula?cedula=121-1034507-7
  tagTypes: ["UQVeiry"],
  endpoints: (builder) => ({
    uqVerificarCedula: builder.query({
      query: (cedula) => `/UQVerificar/verificarCedula?cedula=${cedula}`,
      providesTags: ["UQVerificar"],
    }),
    uqVerificarCedulaUQ: builder.mutation({
      query: (cedula) => ({
        url: `/UQVerificar/verificarCedula?cedula=${cedula}`,
        method: "GET",
      }),
      invalidatesTags: ["UQVeiry"],
    }),
  }),
});

export const { useUqVerificarCedulaQuery, useUqVerificarCedulaUQMutation } =
  uQVerificarApi;
