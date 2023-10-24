import baseUrl from "../../../src/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const serverService = createApi({
  //discord-server
  reducerPath: "serverService",
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
  //auto-refetch servers after if any server created.
  tagTypes: ["getServer"],
  endpoints(builder) {
    return {
      createDiscordServer: builder.mutation({
        query: (args) => ({
          url: "server/create",
          method: "POST",
          body: args,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["getServer"],
      }),
      getUserServers: builder.query({
        query: () => {
          return {
            url: "server/getUserServers",
            method: "GET",
          };
        },
        providesTags: ["getServer"],
      }),
      getServer: builder.query({
        query: (args) => {
          return {
            url: `server/getServer/${args}`,
            method: "GET",
          };
        },
      }),
      invite: builder.query({
        query: (args) => {
          return {
            url: `server/invite/${args}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateDiscordServerMutation,
  useGetUserServersQuery,
  useGetServerQuery,
  useInviteQuery,
} = serverService;
