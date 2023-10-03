import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmploye: builder.query({
      query: () => `/Empleados/obtenerEmpleado`,
      providesTags: ["Employees"],
    }),
    getPersonalInfo: builder.query({
      query: (Id) =>
        `/Empleados/obtenerInfoPersonal?Id=${Id}`,
      providesTags: ["PersonalInfoEmpleado"],
    }),
    createEmploye: builder.mutation({
      query: (newEmpleado) => ({
        url: "/Empleados/insertarEmpleado",
        method: "POST",
        body: newEmpleado,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateEmploye: builder.mutation({
      query: (dataClient) => ({
        url: "/Clientes/actualizarCliente",
        method: "POST",
        body: dataClient,
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmploye: builder.mutation({
      query: (Id) => ({
        url: `/Empleados/eliminarEmpleado?IdCliente=${Id}`,
        method: "POST",
      }),
      invalidatesTags: ["Employees"],
    }),
    restoreEmploye: builder.mutation({
      query: (IdCliente) => ({
        url: `/Clientes/activarCliente?IdCliente=${IdCliente}`,
        method: "POST",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeQuery, useGetPersonalInfoQuery, useDeleteEmployeMutation,useRestoreEmployeMutation,useCreateEmployeMutation,useUpdateEmployeMutation} = employeeApi;
