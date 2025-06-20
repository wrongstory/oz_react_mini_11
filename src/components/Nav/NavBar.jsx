import { Link, useSearchParams } from "react-router-dom";
import useThemeMode from "../../hook/useThemeMode";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDark, toggleTheme } = useThemeMode();

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

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        L's Movie
      </Link>
      <div className="flex items-center gap-2">
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
        <button
          onClick={toggleTheme}
          className="text-white px-2 py-1 border border-white rounded hover:bg-gray-700"
        >
          {isDark ? "☀️ 모드" : "🌙 모드"}
        </button>
      </div>
    </nav>
  );
}
