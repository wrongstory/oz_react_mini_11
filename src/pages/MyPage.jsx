import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, Star } from "lucide-react";

// 더미 위시리스트 예시 데이터
const wishlist = [
  {
    title: "앱솔루션",
    rating: 6.005,
    poster: "https://image.tmdb.org/t/p/w500/yourImage1.jpg",
  },
  {
    title: "데드풀과 울버린",
    rating: 7.679,
    poster: "https://image.tmdb.org/t/p/w500/yourImage2.jpg",
  },
  {
    title: "Armor",
    rating: 5.5,
    poster: "https://image.tmdb.org/t/p/w500/yourImage3.jpg",
  },
  {
    title: "베놈: 라스트 댄스",
    rating: 6.4,
    poster: "https://image.tmdb.org/t/p/w500/yourImage4.jpg",
  },
];

export default function MyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("회원정보");
  const profileImage =
    user.user_metadata?.avatar_url || user.user_metadata?.picture;

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
              onClick={() => setActiveTab(label)} // 탭 전환
              className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded 
        ${
          activeTab === label
            ? "bg-gray-200 dark:bg-gray-700 font-semibold"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }
      `}
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
              {/* 필요 시 닉네임 수정폼 추가 가능 */}
            </div>
          </>
        )}

        {activeTab === "위시리스트" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              WISHLIST
            </h2>
            <hr className="border-gray-300 dark:border-gray-600 mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {wishlist.map((movie, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-700 p-3 rounded-xl shadow-lg hover:scale-105 transition transform duration-200"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-lg mb-3"
                  />
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {movie.title}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                    <Star size={16} fill="currentColor" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
