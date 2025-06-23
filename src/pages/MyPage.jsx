import { useAuth } from "../context/useAuth";

export default function MyPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          마이페이지
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>닉네임:</strong> {user.user_metadata?.full_name || "없음"}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          <strong>이메일:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
