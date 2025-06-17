import movie from "../assets/dumdata/movieDetailData.json";

export default function Ex_MovieDetail() {
  const imageBase = "https://image.tmdb.org/t/p/original";

  const backdrop = `${imageBase}${movie.backdrop_path}`;
  const poster = `${imageBase}${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 배경 이미지 */}
      <div
        className="w-full h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-6xl mx-auto py-10 px-4 md:flex gap-10">
        {/* 포스터 */}
        <div className="shrink-0">
          <img
            src={poster}
            alt={movie.title}
            className="rounded-lg w-64 shadow-lg"
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex-1 space-y-4">
          {/* 태그라인 */}
          {movie.tagline && (
            <p className="text-yellow-400 text-xl font-medium italic">
              "{movie.tagline}"
            </p>
          )}

          {/* 평점 & 러닝타임 */}
          <div className="text-sm text-gray-300 space-x-4">
            <span>⭐ 평점: {movie.vote_average.toFixed(1)}</span>
            <span>⏱️ 상영시간: {movie.runtime}분</span>
            <span>💰 수익: ${movie.revenue.toLocaleString()}</span>
          </div>

          {/* 장르 */}
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* 줄거리 */}
          <div>
            <h2 className="text-2xl font-bold mt-4 mb-2">줄거리</h2>
            <p className="text-gray-200 leading-relaxed">{movie.overview}</p>
          </div>

          {/* 제작사 */}
          {movie.production_companies.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">제작사</h3>
              <div className="flex gap-4 items-center mt-2">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path && (
                      <img
                        src={`${imageBase}${company.logo_path}`}
                        alt={company.name}
                        className="h-6"
                      />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
