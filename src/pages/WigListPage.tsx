import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios"; // 상대경로로 바꿔도 OK
import WigItem from "../components/WigItem";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fetchWigs = async () => {
    const res = await api.get("/wig");
    return res.data;
};

export default function WigListPage() {
    const { data: wigs, isLoading, isError } = useQuery({
        queryKey: ["wigs"],
        queryFn: fetchWigs,
    });

    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const { mutate: createWig, isPending } = useMutation({
        mutationFn: () => api.post("/wig", { title, description, dueDate }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wigs"] }); // 목록 새로고침
            setTitle(""); setDescription(""); setDueDate(""); // 입력값 초기화
        },
        onError: () => alert("등록 실패!"),
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (isError) return <p>에러 발생!</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            {/* 등록 폼 */}
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
                    onClick={() => createWig()}
                    disabled={isPending}
                >
                    {isPending ? "등록 중..." : "등록하기"}
                </button>
            </div>

            {/* 목록 */}
            <h2 className="text-2xl font-bold mb-6">🎯 WIG 목록</h2>
            {wigs.map((wig: any) => (
                <WigItem key={wig.id} wig={wig} />
            ))}
        </div>
    );
}
