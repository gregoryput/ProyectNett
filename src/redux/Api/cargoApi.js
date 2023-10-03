import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:7279/'

export const cargoApi = createApi({
    reducerPath: "cargoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ["cargo"],
    endpoints: (builder) => ({
        getCargo: builder.query({
            query: () => "/Cargos/ObtenerCargo",
            providesTags: ["cargo"],
        }),
    }),
});

export const {
    useGetCargoQuery,
} = cargoApi;
