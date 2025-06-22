import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

const KAKAO_JAVASCRIPT_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

export default function KakaoLoginButton() {
  const { loginWithOAuthUser } = useAuth();
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  // SDK 로딩 감지 및 초기화
  useEffect(() => {
    const waitForKakao = setInterval(() => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
          console.log("Kakao SDK Initialized");
        }
        setIsKakaoReady(true); // 이제 로그인 버튼 작동 가능
        clearInterval(waitForKakao);
      }
    }, 100);

    return () => clearInterval(waitForKakao);
  }, []);

  // 로그인 핸들러
  const handleLogin = () => {
    if (!window.Kakao || !window.Kakao.Auth) {
      alert("Kakao SDK가 아직 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image",
      success() {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            const userData = {
              name: res.kakao_account.profile.nickname,
              thumbnail: res.kakao_account.profile.profile_image_url,
            };

            loginWithOAuthUser(userData);
          },
          fail(err) {
            console.error("카카오 사용자 정보 요청 실패", err);
          },
        });
      },
      fail(err) {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      disabled={!isKakaoReady}
      className={`w-full py-2 mt-4 rounded transition ${
        isKakaoReady
          ? "bg-yellow-300 hover:bg-yellow-400 text-black"
          : "bg-gray-300 text-gray-600 cursor-not-allowed"
      }`}
    >
      카카오로 로그인
    </button>
  );
}
