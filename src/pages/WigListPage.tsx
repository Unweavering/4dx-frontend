import WigItem from "../components/WigItem.tsx";

const dummyWigs = [
    { id: 1, title: "운동하기", description: "매일 30분 이상 걷기", dueDate: "2025-06-30" },
    { id: 2, title: "책읽기", description: "하루 2페이지 읽기", dueDate: "2025-05-31" },
];

export default function WigListPage() {
    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">🎯 WIG 목록</h2>
            {dummyWigs.map((wig) => (
                <WigItem key={wig.id} wig={wig} />
            ))}
        </div>
    );
}
