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

  // 첫 로딩 시 세션 확인
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch({ type: "LOGIN", payload: session.user });
      }
    });

    // 세션 변화 감지 (로그인/로그아웃 실시간 반영)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({ type: "LOGIN", payload: session.user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Supabase 이메일/비밀번호 로그인
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    dispatch({ type: "LOGIN", payload: data.user });
  };

  // 소셜 로그인 (카카오 등)
  const loginWithOAuthUser = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        login,
        loginWithOAuthUser, // 추가
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
