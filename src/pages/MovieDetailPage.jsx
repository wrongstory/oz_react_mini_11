import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useMovieDetail from "../hook/useMovieDetail";
import MovieDetail from "../components/MovieDetail";

export default function MovieDetailPage() {
  const { id } = useParams();
  const { loading } = useSelector((state) => state.movie); // 상태 가져오기
  const movie = useSelector((state) => state.movie.selectedMovie);

  useMovieDetail(id); // 내부적으로 Redux에 저장됨

  if (loading) {
    return (
      <p className="text-black text-center mt-10">영화 정보를 불러오는 중...</p>
    );
  }

  if (!movie) {
    return <p className="text-black text-center mt-10">❌ 영화 정보 없음</p>;
  }

  return <MovieDetail />;
}
