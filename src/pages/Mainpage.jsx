import MovieList from "../components/MovieList";
import MovieSlider from "../components/MovieSlider";
import useDragScrollY from "../hook/useDragScrollY";

export default function MainPage() {
  const { ref, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDragScrollY();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className={`h-screen overflow-y-auto cursor-${isDragging ? "grabbing" : "grab"} select-none pr-2`}
      >
        <h1 className="text-3xl font-bold text-center mb-8">영화 리스트</h1>
        <MovieSlider />
        <MovieList />
      </div>
    </div>
  );
}
