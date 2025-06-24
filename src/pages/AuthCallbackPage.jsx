import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) {
          console.error("세션 교환 실패:", error.message);
          return;
        }

        console.log("세션 교환 성공:", data.session);

        // URL 정리 (선택적 - 깔끔하게 보이기 위함)
        //window.history.replaceState(null, "", window.location.pathname);

        // 메인 페이지로 이동
        navigate("/", { replace: true });
      });
    } else {
      console.warn("⚠️ code 파라미터 없음. 이미 처리되었거나 URL 오류");
    }
  }, [navigate]);

  return <p className="text-black text-center mt-10">로그인 처리 중...</p>;
}
