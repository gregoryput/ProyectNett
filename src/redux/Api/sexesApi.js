import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:7279/'

export const sexesApi = createApi({
    reducerPath: "sexesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ["Sexes"],
    endpoints: (builder) => ({
        getSexes: builder.query({
            query: () => "/Sexos/obtenerSexos",
            providesTags: ["Sexes"],
        }),
    }),
});

export const {
    useGetSexesQuery,
} = sexesApi;
