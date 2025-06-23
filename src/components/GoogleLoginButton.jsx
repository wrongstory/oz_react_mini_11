import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback", // 정확하게 일치
      },
    });

    if (error) {
      console.error("구글 로그인 실패:", error.message);
    }
  };

  useEffect(() => {
    // 로그인 상태 변경 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth 이벤트:", event);
        console.log("세션 정보:", session);
        if (session) {
          navigate("/");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full py-2 mt-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition"
    >
      구글로 로그인
    </button>
  );
}
