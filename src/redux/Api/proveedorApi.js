import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const proveedorApi = createApi({
  reducerPath: "proveedorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Proveedores"],
  endpoints: (builder) => ({
    get: builder.query({
      query: () => `/Proveedores/obtenerProveedores`,
      providesTags: ["Proveedores"],
    }),
    getPersonalProveedor: builder.query({
      query: (IdProveedor) =>
        `/Proveedores/obtenerInfoPersonalProveedor?IdProveedor=${IdProveedor}`,
        providesTags: ["Proveedores"],
    }),
    create: builder.mutation({
      query: (data) => ({
        url: "/Proveedores/insertarProveedores",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Proveedores"],
    }),
    update: builder.mutation({
      query: (data) => ({
        url: "/Proveedores/actualizarProveedor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Proveedores"],
    }),

    desactivar: builder.mutation({
      query: (IdProveedor) => ({
        url: `/Proveedores/eliminarProveedores?IdProveedor=${IdProveedor}`,
        method: "POST",
      }),
      invalidatesTags: ["Proveedores"],
    }),
    restore: builder.mutation({
      query: (IdProveedor) => ({
        url: `/Proveedores/activarProveedor?IdProveedor=${IdProveedor}`,
        method: "POST",
      }),
      invalidatesTags: ["Proveedores"],
    }),
  }),
});

export const {
  useGetQuery,
  useCreateMutation,
  useUpdateMutation,
  useDesactivarMutation,
  useRestoreMutation,
  useGetPersonalProveedorQuery,
} = proveedorApi;
