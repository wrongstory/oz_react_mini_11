import { useEffect, useRef } from "react";

export default function useInfiniteObserver(callback, loading) {
  const ref = useRef(null);
  const debounceRef = useRef(null); // 디바운스 타이머 저장

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (debounceRef.current) clearTimeout(debounceRef.current);

          debounceRef.current = setTimeout(() => {
            console.log("무한스크롤 감지됨");
            callback();
          }, 300); // 300ms 디바운스
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const target = ref.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [callback, loading]);

  return ref;
}
