import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7279/',
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: "usuario/login",
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation } = authApi;