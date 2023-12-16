import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

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
        `/Empleados/obtenerInfoPersonal?IdEmpleado=${Id}`,
      providesTags: ["PersonalInfoEmpleado"],
    }),
    createEmploye: builder.mutation({
      query: (data) => ({
        url: "/Empleados/insertarEmpleado",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmploye: builder.mutation({
      query: (data) => ({
        url: "/Empleados/actualizarEmpleado",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmploye: builder.mutation({
      query: (IdEmpleado) => ({
        url: `/Empleados/eliminarEmpleado?IdEmpleado=${IdEmpleado}`,
        method: "POST",
      }),
      invalidatesTags: ["Employees"],
    }),
    restoreEmploye: builder.mutation({
      query: (IdEmpleado) => ({
        url: `/Empleados/activarEmpleado?IdEmpleado=${IdEmpleado}`,
        method: "POST",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeQuery, useGetPersonalInfoQuery, useDeleteEmployeMutation,useRestoreEmployeMutation,useCreateEmployeMutation,useUpdateEmployeMutation} = employeeApi;
