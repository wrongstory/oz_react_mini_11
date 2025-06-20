import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Mainpage";
import Layout from "./components/Nav/Layout";
import MovieDetailPage from "./pages/MovieDetailPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="details/:id" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  );
}
