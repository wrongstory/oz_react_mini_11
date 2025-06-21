import { Link, useSearchParams } from "react-router-dom";
import useThemeMode from "../../hook/useThemeMode";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/useAuth";

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark, toggleTheme } = useThemeMode();
  const { isLoggedIn, user, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const queryParam = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(queryParam);

  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClear = () => {
    setInputValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (inputValue.trim()) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  }, [inputValue, setSearchParams]);

  // 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* 메인타이틀 (로고로 수정예정) */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex items-center shadow-md">
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold hover:text-yellow-400">
            L's Movie
          </Link>
        </div>

        {/* 검색창 */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="영화 이름 입력.."
            value={inputValue}
            onChange={handleChange}
            className="text-black px-2 py-1 rounded"
          />
          {inputValue && (
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              초기화
            </button>
          )}
        </div>

        {/* 로그인/회원가입 or 유저 드롭다운 */}
        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <img
                src={user?.thumbnail || "/default-user.jpg"} // ✅ user에서 썸네일 사용
                alt="User"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full cursor-pointer border border-white"
              />
            ) : (
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="text-2xl hover:text-yellow-400"
              >
                🧑🏻‍💻
              </button>
            )}

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-32 z-10">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={() => {
                        logout(); // ✅ context에서 logout 호출
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      로그인
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/** 테마 버튼 */}
        <div className="flex items-center gap-4 border-l border-white pl-4 ml-2">
          <button
            onClick={toggleTheme}
            className="text-white px-2 py-1 border border-white rounded hover:bg-gray-700"
          >
            {isDark ? "☀️ 모드" : "🌙 모드"}
          </button>
        </div>
      </nav>
    </>
  );
}
