import { createContext, useReducer, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { isLoggedIn: true, user: action.payload };
    case "LOGOUT":
      return { isLoggedIn: false, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 페이지 로딩 시 기존 세션 불러오기
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        console.log("초기 세션 확인:", session);
        if (session?.user) {
          dispatch({ type: "LOGIN", payload: session.user });
        }
      })
      .catch((err) => console.error("세션 확인 오류:", err));
  }, []);

  // 로그인/로그아웃 실시간 반영 (구글 등 OAuth 포함)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange 세션:", session);
      if (session?.user) {
        dispatch({ type: "LOGIN", payload: session.user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 이메일/비밀번호 로그인
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    dispatch({ type: "LOGIN", payload: data.user });
  };

  // 로그아웃
  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: "LOGOUT" });
  };

  // 소셜 로그인 사용자 수동 추가 처리 시 (Kakao)
  const loginWithOAuthUser = (userData) => {
    dispatch({ type: "LOGIN", payload: { user_metadata: userData } });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, loginWithOAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
