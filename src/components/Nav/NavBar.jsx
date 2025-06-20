import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../redux/searchSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.term);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    console.log(e.target.value);
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        🎬 L's Movie
      </Link>
      <input
        type="text"
        placeholder="영화 이름 입력.."
        value={searchTerm}
        onChange={handleChange}
        className="text-black px-2 py-1 rounded"
      />
    </nav>
  );
}
