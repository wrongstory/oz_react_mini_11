import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, title, rating, poster }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${id}`, { replace: false })}
      className="w-60 bg-white rounded-lg shadow-md overflow-hidden m-4 hover:scale-105 transition-transform"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="w-full h-80 object-cover"
        draggable={false} // feat #8. 슬라이더 드래그 문제 해결
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          ⭐ 평점: {rating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
