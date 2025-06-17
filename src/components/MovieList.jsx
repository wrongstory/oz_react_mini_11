import { useState } from "react";
import MovieCard from "./MovieCard";
import movieListData from "../assets/dumdata/movieListData.json";

export default function MovieList() {
  const [movies] = useState(movieListData.results);

  return (
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
  );
}
