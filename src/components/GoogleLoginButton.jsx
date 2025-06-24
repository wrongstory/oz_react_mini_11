import { supabase } from "../api/supabaseClient";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    // 기존 세션 및 localStorage 강제 초기화
    //await supabase.auth.signOut();
    //localStorage.clear();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // 배포 도메인 명시
      },
    });
    if (data) console.log("구글 로그인 성공!");
    if (error) {
      console.error("구글 로그인 실패:", error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full py-2 mt-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition"
    >
      구글로 로그인
    </button>
  );
}
