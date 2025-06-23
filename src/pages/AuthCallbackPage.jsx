import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      // Supabase가 자동으로 URL의 토큰 처리 (hash 처리)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("AuthCallback 세션:", session);
      console.log("유저 메타데이터:", session?.user?.user_metadata);

      if (session?.user) {
        navigate("/"); // 로그인 성공
      } else {
        console.error("세션 없음 or 실패:", error);
        navigate("/login"); // 로그인 실패 시
      }
    };

    checkSession();
  }, []);

  return <p className="text-white text-center mt-10">로그인 처리 중...</p>;
}
