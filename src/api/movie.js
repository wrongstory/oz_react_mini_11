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

export async function getMovieList(page = 1) {
  const data = await fetchFromTMDB(
    `/movie/popular?language=ko-KR&page=${page}`
  );
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

export async function getMovieTrailer(id) {
  const data = await fetchFromTMDB(`/movie/${id}/videos?language=${LANGUAGE}`);
  const trailers = data.results.filter(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  return trailers.length > 0 ? trailers[0].key : null;
}
