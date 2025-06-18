export default function MovieMeta({ vote, runtime, revenue }) {
  return (
    <div className="text-sm text-gray-300 space-x-4">
      <span>⭐ 평점: {vote.toFixed(1)}</span>
      <span>⏱️ 상영시간: {runtime}분</span>
      <span>💰 수익: ${revenue.toLocaleString()}</span>
    </div>
  );
}
