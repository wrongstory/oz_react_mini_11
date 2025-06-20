import { useEffect } from "react";
import useSearchMovieList from "../hook/useSearchMovieList";
import MovieCard from "../components/MovieCard";
import { useSelector } from "react-redux";
import useDragScrollY from "../hook/useDragScrollY";

export default function SearchPage() {
  const searchTerm = useSelector((state) => state.search.term);
  const { movies, loading } = useSearchMovieList(searchTerm);
  const { ref, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScrollY();

  useEffect(() => {
    console.log("입력된 검색어 상태:", searchTerm);
  }, [searchTerm]);

  return (
    <div>
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={`h-screen overflow-y-auto cursor-${isDragging ? "grabbing" : "grab"} select-none pr-2`}
      >
        <div className="p-6">
          {loading ? (
            <p className="text-white text-center">🔍 검색 중...</p>
          ) : movies.length === 0 && searchTerm ? (
            <p className="text-white text-center">검색 결과가 없습니다.</p>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  poster={movie.poster_path}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
