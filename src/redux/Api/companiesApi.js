import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const companiesApi = createApi({
  reducerPath: "companiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Companies"],
  endpoints: (builder) => ({
    getCompaniesByIdCliente: builder.query({
      query: (params) => {
        if (params.clienteId !== null) {
          return `/Empresas/EmpresasPorClienteId?clienteId=${params.clienteId}&estadoId=${params.estadoId}`;
        } else {
          return { data: null, isLoading: null, isSuccess: null };
        }
      },
      providesTags: ["Companies"],
    }),
  }),
});

export const { useGetCompaniesByIdClienteQuery } = companiesApi;
