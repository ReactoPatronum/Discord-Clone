import { createSlice } from "@reduxjs/toolkit";
import { userService } from "../services/userService";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
  extraReducers: (builder) => {
    //When the Login API call is fullfilled, we return the user object to our state..
    builder.addMatcher(
      userService.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        return payload.user;
      }
    );
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
