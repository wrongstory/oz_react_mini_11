import { useNavigate } from "react-router-dom";

export default function MovieCard({ id, title, rating, poster }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${id}`, { replace: false })}
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
