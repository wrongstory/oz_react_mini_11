import { useRef, useState } from "react";

export default function useDragScrollY() {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - ref.current.offsetTop);
  };

  const onMouseMove = (e) => {
    if (!isDragging || !ref.current) return;

    requestAnimationFrame(() => {
      const y = e.pageY - ref.current.offsetTop;
      const walk = y - startY; // ← 감도 조절
      ref.current.scrollBy({ top: -walk, behavior: "smooth" });
    });

    e.preventDefault();
  };

  const endDrag = () => setIsDragging(false);

  return {
    ref,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
  };
}
