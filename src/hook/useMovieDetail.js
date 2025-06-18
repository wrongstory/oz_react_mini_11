import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie, setLoading, setError } from "../redux/movieSlice";
import { getMovieDetailById } from "../api/movie";

export default function useMovieDetail(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchMovie() {
      try {
        dispatch(setLoading(true)); // 로딩 시작
        const data = await getMovieDetailById(id);
        dispatch(setSelectedMovie(data)); // Redux에 저장
      } catch (err) {
        console.error("영화 상세 에러:", err);
        dispatch(setError(err.toString()));
      } finally {
        dispatch(setLoading(false)); // 로딩 종료
      }
    }

    if (id) fetchMovie(); // id가 존재할 때만 호출
  }, [id, dispatch]);
}
