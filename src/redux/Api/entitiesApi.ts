import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

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
  tagTypes: ["Entities"],

  endpoints: (builder) => ({
    createEntitie: builder.mutation({
      query: (newEntitie) => ({
        url: "/Entidades/InsertarEntidad",
        method: "POST",
        body: newEntitie,
      }),
      invalidatesTags: ["Entities"],
    }),
    updateEntitie: builder.mutation({
      query: (dataClient) => ({
        url: "/Entidades/ActualizarEntidad",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Entities"],
    }),
    deleteEntitie: builder.mutation({
      query: (IdCliente) => ({
        url: `/Entidades/EliminarEntidad?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Entities"],
    }),
    restoreEntitie: builder.mutation({
      query: (IdCliente) => ({
        url: `/Clientes/ActivarEntidad?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Entities"],
    }),
  }),
});

export const {
  useCreateEntitieMutation,
  useUpdateEntitieMutation,
  useDeleteEntitieMutation,
  useRestoreEntitieMutation,
} = entitiesApi;
