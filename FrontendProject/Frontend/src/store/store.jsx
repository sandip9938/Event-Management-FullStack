import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    events: eventReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Avoid unnecessary warnings
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
