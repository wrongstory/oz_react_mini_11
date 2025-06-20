import { useState, useEffect, useCallback, useRef } from "react";
import { getMovieList } from "../api/movie";

export default function useMovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadedIds = useRef(new Set());
  const loadingRef = useRef(false); // 🔒 즉시 체크용

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true; // 🔒 즉시 잠금
    setLoading(true);

    try {
      const currentPage = page;
      setPage((prev) => prev + 1);

      const data = await getMovieList(currentPage);
      console.log(
        "받아온 raw data:",
        data.map((d) => d.id)
      );

      const uniqueMovies = data.filter(
        (movie) => !loadedIds.current.has(movie.id)
      );
      uniqueMovies.forEach((movie) => loadedIds.current.add(movie.id));

      console.log("필터 후 고유 영화 수:", uniqueMovies.length);

      if (uniqueMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...uniqueMovies]);
        console.log("🎬 영화 총 개수:", movies.length + uniqueMovies.length);
      }
    } catch (err) {
      console.error("영화 목록 에러:", err);
    } finally {
      loadingRef.current = false; // 🔓 해제
      setLoading(false);
    }
  }, [page, hasMore, movies]);

  useEffect(() => {
    loadMore(); // 초기 1페이지
  }, []);

  return { movies, loading, loadMore, hasMore };
}
