import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = 'https://localhost:7279/'

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
            query: () => `/Ciudades/obtenerCiudadesEmpleado`,
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
