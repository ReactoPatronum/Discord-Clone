import baseUrl from "../../../src/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const messageService = createApi({
  reducerPath: "messageService",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints(builder) {
    return {
      createMessage: builder.mutation({
        query: (args) => ({
          url: "message/sendMessage",
          method: "POST",
          body: args,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
      }),
      getCurrentUser: builder.query({
        query: () => {
          return {
            url: "user/getCurrentUser",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useCreateMessageMutation, useGetCurrentUserQuery } =
  messageService;
