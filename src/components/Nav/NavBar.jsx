import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearSearchTerm, setSearchTerm } from "../../redux/searchSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    console.log(e.target.value);
  };
  const handleClear = () => {
    dispatch(clearSearchTerm());
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        🎬 L's Movie
      </Link>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="영화 이름 입력.."
          value={searchTerm}
          onChange={handleChange}
          className="text-black px-2 py-1 rounded"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            초기화
          </button>
        )}
      </div>
    </nav>
  );
}
