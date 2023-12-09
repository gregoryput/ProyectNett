import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IClienteDTO, IPersona, IResponseApi } from "../../interfaces";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const personasApi = createApi({
  reducerPath: "personasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Personas"],

  endpoints: (builder) => ({
    getPersonas: builder.query<IResponseApi<any>, IPersona>({
      query: () => `/Personas/obtenerPersonas`,
      providesTags: ["Personas"],
    }),
    createPersona: builder.mutation<IResponseApi<any>, IPersona>({
      query: (newClient) => ({
        url: "/personas/insertarPersona",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Personas"],
    }),
    updatePersona: builder.mutation({
      query: (dataClient) => ({
        url: "/personas/insertarPersona",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Personas"],
    }),

    deletePersona: builder.mutation({
      query: (IdCliente) => ({
        url: `/Personas/eliminarCliente?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Personas"],
    }),
    restorePersona: builder.mutation({
      query: (IdCliente) => ({
        url: `/Personas/activarCliente?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Personas"],
    }),
  }),
});

export const { useCreatePersonaMutation } = personasApi;
