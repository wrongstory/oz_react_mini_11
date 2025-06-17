import { useRef, useEffect, useState } from "react";
import movieList from "../../assets/dumdata/movieListData.json";
import useDragScrollX from "../../hook/useDragScrollX";
import Track from "./Track";
import ControlButtons from "./ControlButtons";

export default function MovieSlider() {
  const containerRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(4);
  const cardWidth = 200;

  const {
    ref: dragRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useDragScrollX();

  const sortedMovies = [...movieList.results].sort(
    (a, b) => b.vote_average - a.vote_average
  );

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current?.offsetWidth;
      if (width) setVisibleCount(Math.floor(width / cardWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollBy = (offset) =>
    containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });

  return (
    <div className="relative w-full px-6">
      <h2 className="text-xl font-bold mb-3 text-black">평점 높은 영화</h2>
      <ControlButtons
        onLeft={() => scrollBy(-cardWidth * visibleCount)}
        onRight={() => scrollBy(cardWidth * visibleCount)}
      />
      <Track
        movies={sortedMovies}
        refs={{ dragRef, containerRef }}
        dragHandlers={{
          isDragging,
          onMouseDown,
          onMouseMove,
          onMouseUp,
          onMouseLeave,
        }}
      />
    </div>
  );
}
