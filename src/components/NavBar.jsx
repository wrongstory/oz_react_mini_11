import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        🎬 MovieApp
      </Link>
      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/details" className="hover:text-yellow-400">
          Details
        </Link>
      </div>
    </nav>
  );
}
