import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const proyectoApi = createApi({
  reducerPath: "proyectoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Proyecto"],
  endpoints: (builder) => ({
    getServicio: builder.query({
      query: () => "/Proyecto/obtenerServicio",
      providesTags: ["Proyecto"],
    }),
    getParametros: builder.query({
      query: () => "/Proyecto/obtenerParametros",
      providesTags: ["Proyecto"],
    }),
    getResponsabilidad: builder.query({
      query: () => "/Proyecto/obtenerResposabilidad",
      providesTags: ["Proyecto"],
    }),
    getPrioridad: builder.query({
      query: () => "/Proyecto/obtenerPrioridad",
      providesTags: ["Proyecto"],
    }),
    getClienteProyecto: builder.query({
      query: () => "/Proyecto/obtenerClientes",
      providesTags: ["Proyecto"],
    }),
    getEmpleado: builder.query({
      query: () => "/Proyecto/obtenerEmpleado",
      providesTags: ["Proyecto"],
    }),
    getProductosUnidadesDetalles: builder.query({
      query: () => "/Proyecto/getProductosUnidadesDetalles",
      providesTags: ["Proyecto"],
    }),
    createParametroCosto: builder.mutation({
      query: (newParam) => ({
        url: "/Proyecto/insertarParametroCosto",
        method: "POST",
        body: newParam,
      }),
      invalidatesTags: ["Proyecto"],
    }),
    createProyecto: builder.mutation({
      query: (newProye) => ({
        url: "/Proyecto/insertarProyectos",
        method: "POST",
        body: newProye,
      }),
      invalidatesTags: ["Proyecto"],
    }),

    //// seecion de parte de presupuesto
    getListaProyecto: builder.query({
      query: () => "/Proyecto/obtenerListaProyecto",
      providesTags: ["Proyecto"],
    }),
    getProyectoCompleto: builder.query({
      query: (IdProyecto) =>
        `/Proyecto/obtenerProyectoCompleto?IdProyecto=${IdProyecto}`,
        providesTags: ["Proyecto"],
    }),

    UpdateEstadoTarea: builder.mutation({
      query: ({IdProyecto, IdTarea, IdEstado}) => ({
        url: `/Proyecto/ActualizarEstadoTarea?IdProyecto=${IdProyecto}&IdTarea=${IdTarea}&IdEstado=${IdEstado}`,
        method: "POST",
      }),

      invalidatesTags: ["Proyecto"],
      
    }),
  }),
});

export const {
  useGetClienteProyectoQuery,
  useGetServicioQuery,
  useGetParametrosQuery,
  useGetEmpleadoQuery,
  useGetPrioridadQuery,
  useGetResponsabilidadQuery,
  useGetProductosUnidadesDetallesQuery,
  useCreateParametroCostoMutation,
  useCreateProyectoMutation,

  /// seccion presupuesto
  useGetListaProyectoQuery,
  useGetProyectoCompletoQuery,
  useUpdateEstadoTareaMutation,
} = proyectoApi;
