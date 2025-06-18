export default function MovieOverview({ overview }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4 mb-2">줄거리</h2>
      <p className="text-gray-200 leading-relaxed">{overview}</p>
    </div>
  );
}
