import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import feedReucer from '../features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReucer
  },
});
