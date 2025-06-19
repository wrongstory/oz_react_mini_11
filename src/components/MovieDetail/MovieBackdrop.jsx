export default function MovieBackdrop({ backdrop, title }) {
  return (
    <div
      className="w-full h-[400px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-6 left-6 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
