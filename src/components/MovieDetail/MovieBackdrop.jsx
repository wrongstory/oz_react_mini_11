export default function MovieBackdrop({ backdrop, title }) {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end p-6">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
