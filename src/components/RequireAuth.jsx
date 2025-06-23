import { useAuth } from "../context/useAuth";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        로그인이 필요합니다.
      </div>
    );
  }

  return children;
}
