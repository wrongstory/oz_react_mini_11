import { useState } from "react";
import MovieList from "../components/MovieList";
import MovieSlider from "../components/MovieSlider";
import useDragScrollY from "../hook/useDragScrollY";
import useSearchMovieList from "../hook/useSearchMovieList";
import MovieCard from "../components/MovieCard";
import TrailerPopup from "../components/TrailerPopup";
import { useSearchParams } from "react-router-dom";

export default function MainPage() {
  const { ref, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScrollY();

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const { movies: searchedMovies, loading } = useSearchMovieList(searchTerm);

  const isSearching = searchTerm.trim().length > 0;

  // 예고편 상태
  const [selectedTrailerKey, setSelectedTrailerKey] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);

  const handleShowTrailer = (key) => {
    setSelectedTrailerKey(key);
    setShowTrailerPopup(true);
  };

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
                  onShowTrailer={handleShowTrailer}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-white">검색 결과가 없습니다.</p>
          )
        ) : (
          <>
            <MovieSlider onShowTrailer={handleShowTrailer} />
            <MovieList onShowTrailer={handleShowTrailer} />{" "}
          </>
        )}
      </div>

      {showTrailerPopup && (
        <TrailerPopup
          trailerKey={selectedTrailerKey}
          onClose={() => setShowTrailerPopup(false)}
        />
      )}
    </div>
  );
}
