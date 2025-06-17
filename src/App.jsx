// App.jsx
import { Routes, Route } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import MainPage from "./pages/Mainpage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details" element={<MovieDetail />} />
    </Routes>
  );
}
