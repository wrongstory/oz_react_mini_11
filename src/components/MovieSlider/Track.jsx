import MovieCard from "../MovieCard";

export default function Track({ movies, refs, dragHandlers, onShowTrailer }) {
  const { dragRef, containerRef } = refs;
  const { isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    dragHandlers;

  return (
    <div
      ref={(node) => {
        dragRef.current = node;
        containerRef.current = node;
      }}
      className={`flex overflow-x-auto space-x-4 pb-2 scrollbar-hide cursor-${isDragging ? "grabbing" : "grab"}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ scrollBehavior: "smooth" }}
    >
      {movies.map((m) => (
        <div key={m.id} className="shrink-0 min-w-[200px]">
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            rating={m.vote_average}
            poster={m.poster_path}
            onShowTrailer={onShowTrailer}
          />
        </div>
      ))}
    </div>
  );
}
