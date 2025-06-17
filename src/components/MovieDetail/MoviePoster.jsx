export default function MoviePoster({ poster, title }) {
  return (
    <div className="shrink-0">
      <img src={poster} alt={title} className="rounded-lg w-64 shadow-lg" />
    </div>
  );
}
