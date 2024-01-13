import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  IClienteDTO,
  IEntidadProveedorDTO,
  IResponseApi,
} from "../../interfaces";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const entitiesApi = createApi({
  reducerPath: "entitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Entities", "Clients", "ProveedoresForSelect"],

  endpoints: (builder) => ({
    //
    getClients: builder.query<IResponseApi<IClienteDTO>, void>({
      query: () => `/Clientes/obtenerClientes`,
      providesTags: ["Clients"],
    }),
    //
    getEntitadesProveedores: builder.query<
      IResponseApi<IEntidadProveedorDTO>,
      void
    >({
      query: () => `/Entidades/GetEntidadesProveedoresForSelectOption`,
      providesTags: ["ProveedoresForSelect"],
    }),
    //
    createEntitie: builder.mutation({
      query: (newEntitie) => ({
        url: "/Entidades/InsertarEntidad",
        method: "POST",
        body: newEntitie,
      }),
      invalidatesTags: ["Clients"],
    }),
    //
    updateEntitie: builder.mutation({
      query: (dataClient) => ({
        url: "/Entidades/ActualizarEntidad",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    //
    deleteEntitie: builder.mutation({
      query: (IdCliente) => ({
        url: `/Entidades/EliminarEntidad?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Clients"],
    }),
    //
    restoreEntitie: builder.mutation({
      query: (IdCliente) => ({
        url: `/Clientes/ActivarEntidad?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useCreateEntitieMutation,
  useUpdateEntitieMutation,
  useDeleteEntitieMutation,
  useRestoreEntitieMutation,
  useGetEntitadesProveedoresQuery,
} = entitiesApi;
