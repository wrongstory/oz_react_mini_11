import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieTrailer } from "../api/movie";

export default function MovieCard({
  id,
  title,
  rating,
  poster,
  onShowTrailer,
}) {
  const navigate = useNavigate();
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(async () => {
      try {
        const key = await getMovieTrailer(id);
        if (key && onShowTrailer) {
          onShowTrailer(key);
        } else {
          alert("❌ 이 영화는 예고편이 없습니다.");
        }
      } catch (err) {
        console.error("트레일러 가져오기 실패", err);
      }
      console.log("호버링 완료");
    }, 2000); // 2초 후 호버링 완료 문제없음
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
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
    </div>
  );
}
