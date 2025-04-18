// src/components/WigForm.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

export default function WigForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            api.post("/wig", { title, description, dueDate }),
        onSuccess: () => {
            alert("등록 성공!");
            queryClient.invalidateQueries({ queryKey: ["wigs"] }); // 목록 새로고침
            setTitle(""); setDescription(""); setDueDate(""); // 입력값 초기화
        },
        onError: () => alert("등록 실패!"),
    });

    return (
        <div className="p-4 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4">🎯 WIG 등록</h2>
            <input
                className="w-full p-2 border rounded mb-2"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded mb-2"
                placeholder="설명"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="date"
                className="w-full p-2 border rounded mb-2"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button
                className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
                onClick={() => mutate()}
                disabled={isPending}
            >
                {isPending ? "등록 중..." : "등록하기"}
            </button>
        </div>
    );
}
