// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            alert("로그인 성공!");
            navigate("/wig");
        } catch (err) {
            alert("로그인 실패!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">로그인</h2>
            <input
                type="text"
                placeholder="아이디"
                className="w-full p-2 border rounded mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                className="w-full p-2 border rounded mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="w-full bg-blue-500 text-white p-2 rounded"
                onClick={handleLogin}
            >
                로그인
            </button>
        </div>
    );
}
