import { useState, useEffect } from "react";
import { getMovieList } from "../api/movie";

export default function useMovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieList()
      .then((data) => setMovies(data))
      .catch((err) => console.error("영화 목록 에러:", err))
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading };
}
