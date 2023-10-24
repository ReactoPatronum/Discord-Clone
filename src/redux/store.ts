import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userService } from "./services/userService";
import userSlice from "./features/userSlice";
import { serverService } from "./services/serverService";
import { channelService } from "./services/channelService";
import { messageService } from "./services/messageService";

const store = configureStore({
  reducer: {
    user: userSlice,
    [userService.reducerPath]: userService.reducer,
    [serverService.reducerPath]: serverService.reducer,
    [channelService.reducerPath]: channelService.reducer,
    [messageService.reducerPath]: messageService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userService.middleware,
      serverService.middleware,
      channelService.middleware,
      messageService.middleware,
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
