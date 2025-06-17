import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ControlButtons({ onLeft, onRight }) {
  return (
    <>
      <button
        onClick={onLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={onRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-80 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>
    </>
  );
}
