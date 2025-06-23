// 📁 src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    console.log("AuthCallback - code 파라미터:", code);

    // 1. code 파라미터가 있을 경우만 교환
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) {
          console.error("세션 교환 실패:", error);
          return;
        }

        // 2. 세션 정상 저장됨
        console.log("세션 교환 성공:", data.session);

        // 3. URL에서 code 파라미터 제거
        url.searchParams.delete("code");
        window.history.replaceState({}, document.title, url.pathname);

        // 4. 메인 페이지로 이동
        navigate("/", { replace: true });
      });
    } else {
      console.warn("code 없음. 리디렉션 실패 또는 이미 처리됨");
    }
  }, [navigate]);

  return <p className="text-black text-center mt-10">로그인 처리 중...</p>;
}
