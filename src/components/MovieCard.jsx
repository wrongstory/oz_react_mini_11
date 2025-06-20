import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieTrailer } from "../api/movie";
import TrailerPopup from "./TrailerPopup";

export default function MovieCard({ id, title, rating, poster }) {
  const navigate = useNavigate();
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(async () => {
      try {
        const key = await getMovieTrailer(id);
        setTrailerKey(key);
        setShowTrailer(true);
      } catch (err) {
        console.error("트레일러 가져오기 실패", err);
      }
    }, 3000); // 5초 뒤 실행
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setShowTrailer(false);
  };

  return (
    <div
      onClick={() => navigate(`/details/${id}`, { replace: false })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-60 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden m-4 hover:scale-105 transition-transform cursor-pointer"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="w-full h-80 object-cover"
        draggable={false}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          ⭐ 평점: {rating.toFixed(1)}
        </p>
      </div>
      {showTrailer && <TrailerPopup trailerKey={trailerKey} />}
    </div>
  );
}
