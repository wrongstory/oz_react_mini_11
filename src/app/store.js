import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
