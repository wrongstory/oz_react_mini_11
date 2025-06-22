import { useState } from "react";
import FormInput from "../components/FormInput";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "이메일을 입력하세요.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다.";
    }

    // 비밀번호: 영문 대소문자 + 숫자 포함, 8자 이상
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!form.password) {
      newErrors.password = "비밀번호를 입력하세요.";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "영문 대소문자와 숫자를 포함한 8자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("로그인 정보:", form);
    // 로그인 API 호출 예정
    const { email, password } = form;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("로그인 실패: " + error.message);
    } else {
      console.log("로그인 성공:", data);
      // 토큰이 자동 저장됨 (session 자동 관리)
      navigate("/"); // 홈 페이지 등으로 이동
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-700 transition">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          로그인
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="example@email.com"
          />
          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            로그인
          </button>
          {errorMsg && (
            <p className="text-red-500 mt-2 text-center">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
