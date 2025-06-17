import { useRef, useEffect, useState } from "react";
import movieList from "../assets/dumdata/movieListData.json";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useDragScrollX from "../hook/useDragScrollX";

export default function Ex_MovieSlider() {
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(200); // 카드 한 장 기준 너비
  const [visibleCount, setVisibleCount] = useState(4); // 한 번에 보이는 카드 수

  // 슬라이더 드래그 스크롤 구현
  const sortedMovies = [...movieList.results].sort(
    (a, b) => b.vote_average - a.vote_average
  );
  const {
    ref: dragRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useDragScrollX();

  const scrollRef = useRef(null); // 버튼 클릭용

  useEffect(() => {
    if (dragRef.current) {
      scrollRef.current = dragRef.current; // 버튼이 동일 ref를 쓰도록 설정
    }
  }, [dragRef]);

  useEffect(() => {
    // 초기화 및 resize 이벤트 반응
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth;
      if (width) {
        const count = Math.floor(width / cardWidth);
        setVisibleCount(count);
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
        ref={(node) => {
          dragRef.current = node;
          containerRef.current = node; // 버튼 & 드래그 동일 DOM 참조
        }}
        className={`flex overflow-x-auto space-x-4 pb-2 scrollbar-hide cursor-${isDragging ? "grabbing" : "grab"}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        style={{ scrollBehavior: "smooth" }}
      >
        {sortedMovies.map((movie) => (
          <div key={movie.id} className="shrink-0 min-w-[200px]">
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
