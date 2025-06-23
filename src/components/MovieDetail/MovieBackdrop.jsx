import { Heart } from "lucide-react";

export default function MovieBackdrop({
  backdrop,
  title,
  liked,
  onToggleWishlist,
}) {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
      <div className="absolute bottom-6 left-6 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {title}
          </h1>

          <button
            onClick={onToggleWishlist}
            className="z-20 relative cursor-pointer transition-transform hover:scale-110"
          >
            <Heart
              size={32}
              className={
                liked ? "text-red-500 fill-red-500" : "text-white fill-none"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
