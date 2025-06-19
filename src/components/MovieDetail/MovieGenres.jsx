export default function MovieGenres({ genres }) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="bg-indigo-700 text-white text-sm font-medium px-4 py-1 rounded-full shadow hover:bg-indigo-600 transition-colors"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
