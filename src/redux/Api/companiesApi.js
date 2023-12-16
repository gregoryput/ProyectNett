import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  keepUnusedDataFor: true,
  endpoints: (builder) => ({
    getCompaniesByIdCliente: builder.query({
      query: (params) => {
        if (params.clienteId !== null) {
          return `/Empresas/EmpresasPorClienteId?clienteId=${params.clienteId}&estadoId=${params.estadoId}`;
        } else {
          return { data: null, isLoading: null, isSuccess: null };
        }
      },

    }),
    getCompaniesByIdProveedor: builder.query({
      query: (params) => {
        if (params.IdProveedor !== null) {
          return `/Empresas/EmpresasPorProveedorId?IdProveedor=${params.IdProveedor}&estadoId=${params.estadoId}`;
        } else {
          return { data: null, isLoading: null, isSuccess: null };
        }
      },
      
    }),
  }),
});

export const { useGetCompaniesByIdClienteQuery, useGetCompaniesByIdProveedorQuery} = companiesApi;
