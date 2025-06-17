import { useState } from "react";
import MovieCard from "../components/MovieCard";
import movieList from "../assets/dumdata/movieListData.json";

export default function MainPage() {
  const [movies] = useState(movieList.results);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">영화 리스트</h1>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            poster={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}
