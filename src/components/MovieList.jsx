import MovieCard from "./MovieCard";
import useMovieList from "../hook/useMovieList";
import useInfiniteObserver from "../hook/useInfiniteObserver";

export default function MovieList({ onShowTrailer }) {
  const { movies, loading, loadMore, hasMore } = useMovieList();

  const observerRef = useInfiniteObserver(() => {
    if (!loading && hasMore) {
      loadMore();
    }
  }, loading);

  return (
    <div className="flex flex-wrap justify-center">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          rating={movie.vote_average}
          poster={movie.poster_path}
          onShowTrailer={onShowTrailer}
        />
      ))}

      {/* 로딩 시 스피너 UI */}
      {loading && (
        <div className="w-full flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
        </div>
      )}

      {/* 무한스크롤 감지용 (보이지 않게) */}
      {hasMore && (
        <div
          ref={observerRef}
          className="h-1 w-full"
          style={{ visibility: "hidden" }}
        />
      )}
    </div>
  );
}
