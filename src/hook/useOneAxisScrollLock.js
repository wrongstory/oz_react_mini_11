import { useEffect } from "react";

export const useOneAxisScrollLock = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (isHorizontal) {
        e.preventDefault();
        el.scrollLeft += e.deltaX;
      } else if (isVertical) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [ref]);
};

// 안타깝지만 이건 휠만을 막아주기에 못쓴다.
