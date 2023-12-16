import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

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
      query: () => `/Clientes/obtenerClientes`,
      providesTags: ["Clients"],
    }),
    getPersonalInfo: builder.query({
      query: (IdCliente) =>
        `/Clientes/obtenerInfoPersonal?IdCliente=${IdCliente}`,
      providesTags: ["PersonalInfoClient"],
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "/Clientes/insertarClientes",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: (dataClient) => ({
        url: "/Clientes/actualizarCliente",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Clients"],
    }),

    deleteClient: builder.mutation({
      query: (IdCliente) => ({
        url: `/Clientes/eliminarCliente?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Clients"],
    }),
    restoreClient: builder.mutation({
      query: (IdCliente) => ({
        url: `/Clientes/activarCliente?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useRestoreClientMutation,
  useGetPersonalInfoQuery,
} = clientsApi;
