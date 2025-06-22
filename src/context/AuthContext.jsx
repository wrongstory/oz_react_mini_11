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

  /* ① 첫 로딩 때 세션 확인 */
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (session?.user) dispatch({ type: "LOGIN", payload: session.user });
      })
      .finally(() => {
        /* 필요하면 로딩 상태 추가 가능 */
      });

    /* ② 로그인·로그아웃 실시간 반영 */
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

  /* ③ 액션 래퍼 – Supabase 호출 + 리듀서 디스패치 */
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    dispatch({ type: "LOGIN", payload: data.user });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
