// ✅ /src/redux/movieSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie(state) {
      state.selectedMovie = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setMovies,
  setSelectedMovie,
  clearSelectedMovie,
  setLoading,
  setError,
} = movieSlice.actions;
export default movieSlice.reducer;
