import MovieCard from "./MovieCard";
import useMovieList from "../hook/useMovieList";

export default function MovieList({ onShowTrailer }) {
  const { movies, loading } = useMovieList();

  if (loading) {
    return (
      <p className="text-white text-center mt-10">영화 목록 불러오는 중...</p>
    );
  }

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
    </div>
  );
}
