import MovieBackdrop from "./MovieBackdrop";
import MoviePoster from "./MoviePoster";
import MovieMeta from "./MovieMeta";
import MovieGenres from "./MovieGenres";
import MovieOverview from "./MovieOverview";
import MovieCompanies from "./MovieCompanies";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import {
  isInWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../api/withlist";

export default function MovieDetail() {
  const movie = useSelector((state) => state.movie.selectedMovie);
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);

  const imageBase = "https://image.tmdb.org/t/p/original";
  const backdrop = `${imageBase}${movie.backdrop_path}`;
  const poster = `${imageBase}${movie.poster_path}`;

  useEffect(() => {
    if (user && movie?.id) {
      isInWishlist(user.id, movie.id).then(setLiked);
    }
  }, [user, movie?.id]);

  const handleWishlistToggle = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      await removeFromWishlist(user.id, movie.id);
      setLiked(false);
    } else {
      await addToWishlist(user.id, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      });
      setLiked(true);
    }
  };
  return (
    <div className="relative bg-gray-200 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[400px] z-20">
        <MovieBackdrop
          backdrop={backdrop}
          title={movie.title}
          liked={liked}
          onToggleWishlist={handleWishlistToggle}
        />
      </div>

      <div className="relative z-10 pt-[420px] pb-20 px-4">
        <div className="max-w-6xl mx-auto bg-gray-100 text-black dark:bg-gray-800 dark:text-white rounded-3xl shadow-2xl p-8 md:flex gap-10 min-h-[650px]">
          <MoviePoster poster={poster} title={movie.title} />
          <div className="flex-1 space-y-6 mt-6 md:mt-0">
            {movie.tagline && (
              <p className="text-indigo-600 text-lg font-semibold italic">
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
            <MovieCompanies
              companies={movie.production_companies}
              imageBase={imageBase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
