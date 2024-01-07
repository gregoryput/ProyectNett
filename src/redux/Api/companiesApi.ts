import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { EmpresaInfoDTO, IResponseApi } from "../../interfaces";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const companiesApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Empresas"],

  endpoints: (builder) => ({
    getEmpresas: builder.query<IResponseApi<EmpresaInfoDTO>, void>({
      query: () => `/Empresas/GetDatosEmpresas`,
      providesTags: ["Empresas"],
    }),
    createEmpresa: builder.mutation({
      query: (newClient) => ({
        url: "/Clientes/insertarClientes",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Empresas"],
    }),
    updateEmpresa: builder.mutation({
      query: (dataClient) => ({
        url: "/Clientes/actualizarCliente",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Empresas"],
    }),
  }),
});

export const { useGetEmpresasQuery, useUpdateEmpresaMutation } = companiesApi;
