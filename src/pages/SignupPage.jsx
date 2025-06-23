import { useState } from "react";
import FormInput from "../components/FormInput";
import { supabase } from "../api/supabaseClient";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // 이름: 2~8자, 숫자/한글/영어 허용
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!form.name.trim()) {
      newErrors.name = "이름을 입력하세요.";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = "이름은 2~8자, 숫자/한글/영어만 가능합니다.";
    }

    // 이메일: 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "이메일을 입력하세요.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다.";
    }

    // 비밀번호: 대문자/소문자/숫자 조합 (8자 이상)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!form.password) {
      newErrors.password = "비밀번호를 입력하세요.";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "영문 대소문자와 숫자를 포함한 8자 이상이어야 합니다.";
    }

    // 비밀번호 확인
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("회원가입 정보:", form);
    // 실제 API 연동 처리

    const { email, password } = form;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (data) {
      alert("성공");
    }
    if (error) {
      if (error.message.includes("duplicate key")) {
        setErrors({ email: "이미 가입된 이메일입니다." });
      } else {
        alert("회원가입 실패: " + error.message);
      }
      return;
    }

    setSuccess("가입 성공! 이메일을 확인하세요.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-700 transition">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          회원가입
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="이름"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="홍길동"
          />
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
          <FormInput
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            회원가입
          </button>
          {success && (
            <p className="text-green-500 mt-2 text-center">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
