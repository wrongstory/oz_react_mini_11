import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Mainpage";
import Layout from "./components/Layout";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/details" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}
