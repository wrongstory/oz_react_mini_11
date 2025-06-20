import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../hook/useDebounce";

export default function NavBar() {
  const [searchMovie, setSearchMovie] = useState("");
  const debouncSearchTerm = useDebounce(searchMovie, 500);

  const handleChange = (e) => {
    setSearchMovie(e.target.value);
  };

  useEffect(() => {
    if (debouncSearchTerm) {
      console.log("🔍 Debounced 검색어:", debouncSearchTerm);
    }
  }, [debouncSearchTerm]);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        🎬 L's Movie
      </Link>
      <input
        type="text"
        placeholder="영화 이름 입력.."
        value={searchMovie}
        onChange={handleChange}
        className="text-black"
      />
    </nav>
  );
}
