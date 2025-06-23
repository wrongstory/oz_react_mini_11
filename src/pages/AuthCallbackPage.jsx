import { useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    console.log("code 파라미터:", code);

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) {
          console.error("세션 교환 실패:", error);
        } else {
          console.log("세션 교환 성공:", data.session);

          // URL에서 ?code= 제거
          url.searchParams.delete("code");
          window.history.replaceState({}, document.title, url.pathname);

          // 메인으로 이동
          navigate("/");
        }
      });
    } else {
      console.warn("⚠️ code 없음. 리디렉션 실패 또는 URL 설정 오류");
    }
  }, [navigate]);

  return <p className="text-white text-center mt-10">로그인 처리 중...</p>;
}
