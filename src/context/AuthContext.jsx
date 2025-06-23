import { useReducer, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { AuthContext } from "./AuthContext";

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
  // 앱 첫 로딩 시 기존 세션 확인
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) return; // AuthCallback에서 처리

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
