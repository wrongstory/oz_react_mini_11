import { supabase } from "../api/supabaseClient";

export default function KakaoLoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // 배포 도메인 명시
      },
    });

    if (error) {
      console.error("카카오 로그인 실패:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full py-2 mt-4 rounded bg-yellow-300 hover:bg-yellow-400 text-black transition"
    >
      카카오로 로그인
    </button>
  );
}
