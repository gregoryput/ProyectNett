import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:7279/'

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
        getUnidade: builder.query({
            query: () => "/Proyecto/obtenerUnidad",
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
      
        
    }),
});

export const {
    useGetClienteProyectoQuery,
    useGetServicioQuery,
    useGetUnidadeQuery,
    useGetEmpleadoQuery,
    useGetPrioridadQuery,
    useGetResponsabilidadQuery,
} = proyectoApi;
