import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import MovieSlider from "../components/MovieSlider";
import useDragScrollY from "../hook/useDragScrollY";
import useSearchMovieList from "../hook/useSearchMovieList";
import MovieCard from "../components/MovieCard";

export default function MainPage() {
  const { ref, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScrollY();
  const searchTerm = useSelector((state) => state.search.term);
  const { movies: searchedMovies, loading } = useSearchMovieList(searchTerm);

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="min-h-screen pt-5 bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={`h-screen overflow-y-auto cursor-${isDragging ? "grabbing" : "grab"} select-none pr-2`}
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          {isSearching ? `검색 결과: "${searchTerm}"` : "인기 영화"}
        </h1>

        {isSearching ? (
          loading ? (
            <p className="text-center text-white">검색 중...</p>
          ) : searchedMovies.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-center">
              {searchedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  poster={movie.poster_path}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-white">검색 결과가 없습니다.</p>
          )
        ) : (
          <>
            <MovieSlider />
            <MovieList />
          </>
        )}
      </div>
    </div>
  );
}
