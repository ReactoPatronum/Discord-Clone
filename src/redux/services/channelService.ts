import baseUrl from "../../../src/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const channelService = createApi({
  //discord-channels
  reducerPath: "channelService",
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
      createDiscordChannel: builder.mutation({
        query: (args) => ({
          url: "channel/create",
          method: "POST",
          body: args,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }),
      }),
      getInitialChannel: builder.query({
        query: (args) => {
          return {
            url: `channel/getInitialChannel/${args.serverId}`,
            method: "GET",
          };
        },
      }),
      getChannel: builder.query({
        query: (args) => {
          return {
            url: `channel/getChannel/${args.serverId}/channel/${args.channelId}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateDiscordChannelMutation,
  useGetInitialChannelQuery,
  useGetChannelQuery,
} = channelService;
