import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:5173/'

export const citiesApi = createApi({
    reducerPath: "citiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ["Cities"],
    endpoints: (builder) => ({
        getCities: builder.query({
            query: () => "/Ciudades/ObtenerCiudades",
            providesTags: ["Cities"],
        }),
        createCities: builder.mutation({
            query: (newCity) => ({
                url: "/Cities/InsertarCiudad",
                method: "POST",
                body: newCity,
            }),
            invalidatesTags: ["Cities"],
        }),
    }),
});

export const {
    useGetCitiesQuery,
    useCreateCitiesMutation,
} = citiesApi;
