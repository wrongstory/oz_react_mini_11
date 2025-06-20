const API_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const LANGUAGE = "ko-KR";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

// feat. fetch 함수 공통으로
async function fetchFromTMDB(endurl) {
  try {
    const res = await fetch(`${API_URL}${endurl}`, options);
    if (!res.ok) {
      throw new Error(`TMDB API 호출 실패: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("TMDB API 요청 중 오류:", error);
    throw error;
  }
}

export async function getMovieList() {
  const data = await fetchFromTMDB(`/movie/popular?language=${LANGUAGE}`);
  return data.results.filter((movie) => !movie.adult);
}

export async function getMovieDetailById(id) {
  return await fetchFromTMDB(`/movie/${id}?language=${LANGUAGE}`);
}

export async function searchMovieByQuery(query) {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&language=${LANGUAGE}`
  );
  console.log(data.results);
  return data.results.filter((movie) => !movie.adult);
}
