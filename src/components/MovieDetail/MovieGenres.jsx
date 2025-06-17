export default function MovieGenres({ genres }) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span
          key={genre.id}
          className="bg-gray-700 text-sm px-3 py-1 rounded-full"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
