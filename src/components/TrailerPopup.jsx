export default function TrailerPopup({ trailerKey }) {
  if (!trailerKey) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 z-20">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
        title="Trailer"
        allow="autoplay; encrypted-media"
      />
    </div>
  );
}
