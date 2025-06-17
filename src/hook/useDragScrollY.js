import { useRef, useState, useEffect } from "react";

export default function useDragScrollY() {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - ref.current.offsetTop);
    setScrollTop(ref.current.scrollTop);
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 모바일 터치 대응
    const onTouchStart = (e) => onMouseDown(e.touches[0]);
    const onTouchMove = (e) => onMouseMove(e.touches[0]);

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchmove", onTouchMove);
    el.addEventListener("touchend", endDrag);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", endDrag);
    };
  }, [isDragging, startY, scrollTop]);

  return {
    ref,
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp: endDrag,
    onMouseLeave: endDrag,
  };
}
