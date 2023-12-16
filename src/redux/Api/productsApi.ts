import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDocumentoDTO, IProductoInv, IResponseApi } from "../../interfaces";

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
    getProductsInvWithExistence: builder.query<IResponseApi<IProductoInv>, void>({
      query: () => `Productos/GetListaProductosInfoInv`,
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
  useGetProductsInvWithExistenceQuery,
  useGetProductsForFCQuery,
  useCreateProductMutation,
} = productsApi;
