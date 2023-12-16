import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/usuario/obtenerUsuario`,
      providesTags: ["users"],
    }),
    getRoles: builder.query({
      query: () => `/RolesDeUsuario/ObtenerCargo`,
      providesTags: ["users"],
    }),
    getEmpleadoNotUser: builder.query({
      query: () =>
        `/usuario/obtenerEmpleado`,
      providesTags: ["users"],
    }),
    createUser: builder.mutation({
      query: (newClient) => ({
        url: "/usuario/insertarUsuario",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation({
      query: (dataUser) => ({
        url: "/usuario/ActualizarUsuario",
        method: "POST",
        body: dataUser,
      }),
      invalidatesTags: ["users"],
    }),

    deleteUser: builder.mutation({
      query: (IdUsuario) => ({
        url: `/usuario/eliminarUsuario?IdUsuario=${IdUsuario}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    restoreUser: builder.mutation({
      query: (IdUsuario) => ({
        url: `/usuario/activarUsuario?IdUsuario=${IdUsuario}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRestoreUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetEmpleadoNotUserQuery,
} = usersApi;
