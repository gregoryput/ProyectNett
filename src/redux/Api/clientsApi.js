import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (pag) =>
        `/Clientes/obtenerClientes?pageNumber=${pag.pageNumber}&pageSize=${pag.pageSize}`,
      providesTags: ["Clients"],
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "/Clientes/insertarClientes",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const { useGetClientsQuery, useCreateClientMutation } = clientsApi;
