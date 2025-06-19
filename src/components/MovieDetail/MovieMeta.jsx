export default function MovieMeta({ vote, runtime, revenue }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center text-white text-base gap-2 md:gap-6 bg-gray-800 p-4 rounded-xl shadow-inner">
      <span className="flex items-center gap-2">
        ⭐ <strong className="font-semibold">평점:</strong> {vote.toFixed(1)}
      </span>
      <span className="flex items-center gap-2">
        ⏱️ <strong className="font-semibold">상영시간:</strong> {runtime}분
      </span>
      <span className="flex items-center gap-2">
        💰 <strong className="font-semibold">수익:</strong> $
        {revenue.toLocaleString()}
      </span>
    </div>
  );
}
