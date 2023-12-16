import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:5173/'

export const countriesApi = createApi({
    reducerPath: "countriesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ["Countries"],
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => "/Paises/ObtenerPaises",
            providesTags: ["Countries"],
        }),
        createCountries: builder.mutation({
            query: (newCountrie) => ({
                url: "/Paises/InsertarPais",
                method: "POST",
                body: newCountrie,
            }),
            invalidatesTags: ["Countries"],
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useCreateCountriesMutation,
} = countriesApi;
