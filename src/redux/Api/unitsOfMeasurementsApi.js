import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:5173/";

export const unitsOfMeasurementsApi = createApi({
  reducerPath: "unitsOfMeasurementsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["UnitsOfMeasurements"],
  endpoints: (builder) => ({
    getUnistOfMeasurements: builder.query({
      query: () => "/UnidadMedida/obtenerUnidadesMedida",
      providesTags: ["UnitsOfMeasurements"],
    }),
  }),
});

export const { useGetUnistOfMeasurementsQuery } = unitsOfMeasurementsApi;
