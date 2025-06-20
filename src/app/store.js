import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../redux/movieSlice";
import searchReducer from "../redux/searchSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    search: searchReducer,
  },
});
