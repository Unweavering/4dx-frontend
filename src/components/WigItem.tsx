import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

type Wig = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
};

export default function WigItem({ wig }: { wig: Wig }) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(wig.title);
    const [description, setDescription] = useState(wig.description);
    const [dueDate, setDueDate] = useState(wig.dueDate);

    const queryClient = useQueryClient();

    const { mutate: updateWig } = useMutation({
        mutationFn: () =>
            api.put(`/wig/${wig.id}`, { title, description, dueDate }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wigs"] });
            setEditMode(false);
        },
        onError: () => alert("수정 실패!"),
    });

    const { mutate: deleteWig } = useMutation({
        mutationFn: () => api.delete(`/wig/${wig.id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wigs"] });
        },
        onError: () => alert("삭제 실패!"),
    });

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            {editMode ? (
                <>
                    <input
                        className="w-full border p-1 mb-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="w-full border p-1 mb-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full border p-1 mb-2"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => updateWig()}
                    >
                        저장
                    </button>
                    <button
                        className="bg-gray-300 px-2 py-1 rounded mr-2"
                        onClick={() => setEditMode(false)}
                    >
                        취소
                    </button>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteWig()}
                    >
                        삭제
                    </button>
                </>
            ) : (
                <>
                    <h3 className="text-xl font-bold">{wig.title}</h3>
                    <p className="text-gray-700 mt-1">{wig.description}</p>
                    <p className="text-sm text-gray-500 mt-2">마감일: {wig.dueDate}</p>
                    <div className="flex gap-3 mt-2">
                        <button
                            className="text-blue-500 underline"
                            onClick={() => setEditMode(true)}
                        >
                            ✏️ 수정
                        </button>
                        <button
                            className="text-red-500 underline"
                            onClick={() => {
                                if (confirm("정말 삭제할까요?")) deleteWig();
                            }}
                        >
                            🗑 삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
