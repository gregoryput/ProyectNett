import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const token = localStorage.getItem("token");
const baseUrl = "https://localhost:7279/";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProductsWithExistence: builder.query({
      query: () => `/Productos/obtenerProductos`,
      providesTags: ["Products"],
    }),
    getProductsForFC: builder.query({
      query: () => `/Productos/obtenerProductosParaFC`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/Productos/insertarProducto",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsWithExistenceQuery,
  useGetProductsForFCQuery,
  useCreateProductMutation,
} = productsApi;
