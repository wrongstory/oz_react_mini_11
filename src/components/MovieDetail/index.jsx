import movie from "../../assets/dumdata/movieDetailData.json";
import MovieBackdrop from "./MovieBackdrop";
import MoviePoster from "./MoviePoster";
import MovieMeta from "./MovieMeta";
import MovieGenres from "./MovieGenres";
import MovieOverview from "./MovieOverview";
import MovieCompanies from "./MovieCompanies";

export default function MovieDetail() {
  const imageBase = "https://image.tmdb.org/t/p/original";
  const backdrop = `${imageBase}${movie.backdrop_path}`;
  const poster = `${imageBase}${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MovieBackdrop backdrop={backdrop} title={movie.title} />

      <div className="max-w-6xl mx-auto py-10 px-4 md:flex gap-10">
        <MoviePoster poster={poster} title={movie.title} />

        <div className="flex-1 space-y-4">
          {movie.tagline && (
            <p className="text-yellow-400 text-xl font-medium italic">
              "{movie.tagline}"
            </p>
          )}

          <MovieMeta
            vote={movie.vote_average}
            runtime={movie.runtime}
            revenue={movie.revenue}
          />

          <MovieGenres genres={movie.genres} />
          <MovieOverview overview={movie.overview} />
          <MovieCompanies companies={movie.production_companies} />
        </div>
      </div>
    </div>
  );
}
