import { useRef, useEffect, useState } from "react";
import movieList from "../assets/dumdata/movieListData.json";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieSlider() {
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(200); // 카드 한 장 기준 너비
  const [visibleCount, setVisibleCount] = useState(4); // 한 번에 보이는 카드 수

  useEffect(() => {
    // 초기화 및 resize 이벤트 반응
    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        const containerWidth = container.offsetWidth;
        const calculatedCount = Math.floor(containerWidth / cardWidth);
        setVisibleCount(calculatedCount);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth]);

  const scrollAmount = cardWidth * visibleCount;

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const sortedMovies = [...movieList.results].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  return (
    <div className="relative w-full px-6">
      <h2 className="text-xl font-bold mb-3 text-black">평점 높은 영화</h2>

      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 pb-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            style={{ minWidth: `${cardWidth}px` }}
            className="shrink-0"
          >
            <MovieCard
              title={movie.title}
              rating={movie.vote_average}
              poster={movie.poster_path}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
