import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieTrailer } from "../api/movie";
import { Heart } from "lucide-react";
import {
  isInWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/withlist";
import { useAuth } from "../context/useAuth";

export default function MovieCard({
  id,
  title,
  rating,
  poster,
  onShowTrailer,
}) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(async () => {
      try {
        const key = await getMovieTrailer(id);
        if (key && onShowTrailer) {
          onShowTrailer(key);
        } else {
          alert("이 영화는 예고편이 없습니다.");
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

  useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        try {
          const isLiked = await isInWishlist(user.id, id);
          setLiked(isLiked);
        } catch (err) {
          console.error("위시리스트 확인 실패", err);
        }
      }
    };
    checkWishlist();
  }, [user, id]);

  const handleWishlistToggle = async () => {
    if (!user) return alert("로그인이 필요합니다.");

    if (liked) {
      const { error } = await removeFromWishlist(user.id, id);
      if (!error) setLiked(false);
      else console.error("삭제 실패:", error.message);
    } else {
      const { error } = await addToWishlist(user.id, {
        id,
        title,
        poster_path: poster,
        vote_average: rating,
      });
      if (!error) setLiked(true);
      else console.error("추가 실패:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      isInWishlist(user.id, id).then((result) => {
        console.log("✅ 찜 여부:", result, "movieId:", id);
        setLiked(result);
      });
    } else {
      setLiked(false);
    }
  }, [user, id]);

  return (
    <div
      onClick={() => {
        clearTimeout(hoverTimer.current);
        navigate(`/details/${id}`, { replace: false });
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-60 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden m-4 hover:scale-105 transition-transform cursor-pointer"
    >
      {/* 하트 버튼은 카드 전체 기준으로 배치 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleWishlistToggle();
        }}
        className="absolute bottom-4 right-4 z-10"
      >
        <Heart
          size={20}
          fill={liked ? "red" : "none"}
          color={liked ? "red" : "gray"}
          className="transition-colors duration-200"
        />
      </button>

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
