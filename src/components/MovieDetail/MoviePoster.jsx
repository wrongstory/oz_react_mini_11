export default function MoviePoster({ poster, title }) {
  return (
    <div className="shrink-0 flex items-center justify-center">
      <img
        src={poster}
        alt={title}
        className="w-80 md:w-96 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}
