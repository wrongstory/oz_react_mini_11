import { useState, useEffect } from "react";
import { searchMovieByQuery } from "../api/movie";
import useDebounce from "./useDebounce";

export default function useSearchMovieList(searchTerm) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log("useSearchMovieList 진입");
    console.log("디바운스 검색어:", debounced);

    if (!debounced) {
      console.log("디바운스 비어있음");
      setMovies([]);
      return;
    }

    console.log("API 호출 시작:", debounced);
    setLoading(true);
    searchMovieByQuery(debounced)
      .then((data) => {
        console.log("API 응답:", data);
        setMovies(data);
      })
      .catch((err) => {
        console.error("검색 실패:", err);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
        console.log("로딩 종료");
      });
  }, [debounced]);

  return { movies, loading };
}
