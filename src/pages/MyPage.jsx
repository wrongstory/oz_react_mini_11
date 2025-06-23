import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWishlist, removeFromWishlist } from "../api/withlist";
import { X } from "lucide-react";
// 더미 위시리스트 예시 데이터

export default function MyPage() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("회원정보");

  const profileImage =
    user.user_metadata?.avatar_url || user.user_metadata?.picture;

  // 위시리스트 불러오기
  useEffect(() => {
    if (user) {
      fetchWishlist(user.id).then(({ data }) => {
        console.log("가져온 위시리스트 데이터:", data);
        setWishlist(data || []);
      });
    }
  }, [user]);

  // 위시리스트 제거
  const handleRemove = async (movieId) => {
    const confirmed = window.confirm("정말로 위시리스트에서 제거하시겠습니까?");
    if (!confirmed) return;

    const { error } = await removeFromWishlist(user.id, Number(movieId));
    if (!error) {
      setWishlist((prev) =>
        prev.filter((movie) => Number(movie.movie_id) !== Number(movieId))
      );
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  // 로그인 안됐으면 홈으로 리디렉션
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-black dark:text-white">
      {/* 사이드바 */}
      <aside className="w-64 p-6 flex flex-col items-center border-r border-gray-300 dark:border-gray-700">
        {profileImage ? (
          <div className="relative w-24 h-24 mb-4">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-full h-full object-cover rounded-full border-4 border-white dark:border-black shadow-md"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 text-white flex items-center justify-center text-4xl font-bold mb-4 shadow-md">
            {user.user_metadata?.full_name?.[0] || "U"}
          </div>
        )}

        <div className="text-lg font-bold mb-6">
          {user.user_metadata?.full_name || "사용자"} 님
        </div>

        <nav className="w-full space-y-4">
          {["회원정보", "위시리스트"].map((label) => (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded 
              ${
                activeTab === label
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span>{label}</span>
              <span className="text-gray-500 dark:text-gray-400">{">"}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-10 rounded-tl-3xl transition-colors duration-300">
        {activeTab === "회원정보" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              회원정보
            </h2>
            <hr className="border-gray-300 dark:border-gray-600 mb-8" />
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>닉네임:</strong>{" "}
                {user.user_metadata?.full_name || "없음"}
              </p>
              <p>
                <strong>이메일:</strong> {user.email}
              </p>
            </div>
          </>
        )}

        {activeTab === "위시리스트" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              위시리스트
            </h2>
            <hr className="border-gray-300 dark:border-gray-600 mb-8" />

            {wishlist.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                위시리스트가 비어 있습니다.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {wishlist.map((movie) => (
                  <div
                    key={movie.movie_id}
                    className="relative bg-white dark:bg-gray-700 p-3 rounded-xl shadow-lg"
                  >
                    <button
                      onClick={() => handleRemove(movie.movie_id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                    >
                      <X size={20} />
                    </button>

                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {movie.title}
                    </div>
                    <div className="text-yellow-500 text-sm mt-1">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
