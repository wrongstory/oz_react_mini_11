export async function getMovieList() {
  const res = await fetch("/asset/dumdata/movieListData.json");
  const data = await res.json();
  return data.results;
}

export async function getMovieDetailById(id) {
  const res = await fetch("/asset/dumdata/movieDetailData.json");
  const data = await res.json();
  return data.results.find((movie) => movie.id === Number(id));
}
