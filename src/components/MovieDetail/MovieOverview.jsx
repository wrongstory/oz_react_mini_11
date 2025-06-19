export default function MovieOverview({ overview }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-white border-b border-gray-600 pb-2 mb-4">
        🎬 줄거리
      </h2>
      <p className="text-gray-200 leading-relaxed">
        {overview?.trim()
          ? overview
          : "해당 영화에 대한 줄거리 정보가 없습니다."}
      </p>
    </div>
  );
}
