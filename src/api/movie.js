const API_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export async function getMovieList() {
  const res = await fetch(`${API_URL}/movie/popular?language=ko-KR`, options);
  if (!res.ok) {
    throw new Error("API 호출 실패!!!!");
  }
  const data = await res.json();
  return data.results;
}

export async function getMovieDetailById(id) {
  const res = await fetch(`${API_URL}/movie/${id}?language=ko-KR`, options);
  if (!res.ok) {
    throw new Error("API 호출 실패!!!!");
  }
  const data = await res.json();
  return data;
}
