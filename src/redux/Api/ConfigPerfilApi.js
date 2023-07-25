import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const ConfigPerfilApi = createApi({
  reducerPath: "ConfigPerfilApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Perfils"],
  endpoints: (builder) => ({
    getPerfil: builder.query({
      query: (id) =>
        `Perfil/InfoPerfil?idUsuario=${id}`,
      providesTags: ["Perfils"],
    }),
  }),
});

export const { useGetPerfilQuery  } = ConfigPerfilApi;
