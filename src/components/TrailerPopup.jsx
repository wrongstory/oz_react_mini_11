export default function TrailerPopup({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full max-w-5xl aspect-video">
        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
