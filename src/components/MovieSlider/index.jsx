import { useRef, useEffect, useState } from "react";
import useDragScrollX from "../../hook/useDragScrollX";
import Track from "./Track";
import ControlButtons from "./ControlButtons";
import useMovieList from "../../hook/useMovieList";

export default function MovieSlider() {
  const containerRef = useRef(null);
  const cardWidth = 200;
  const [visibleCount, setVisibleCount] = useState(4);

  const { movies, loading } = useMovieList();

  const {
    ref: dragRef,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  } = useDragScrollX();

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

  if (loading) {
    return <p className="text-center text-gray-600">영화 불러오는 중...</p>;
  }

  return (
    <div className="relative w-full px-6">
      <h2 className="text-xl font-bold mb-3 text-black">평점 높은 영화</h2>
      <ControlButtons
        onLeft={() => scrollBy(-cardWidth * visibleCount)}
        onRight={() => scrollBy(cardWidth * visibleCount)}
      />
      <Track
        movies={movies}
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
