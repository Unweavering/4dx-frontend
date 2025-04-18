import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios"; // 상대경로로 바꿔도 OK
import WigItem from "../components/WigItem";

const fetchWigs = async () => {
    const res = await api.get("/wig");
    return res.data;
};

export default function WigListPage() {
    const { data: wigs, isLoading, isError } = useQuery({
        queryKey: ["wigs"],
        queryFn: fetchWigs,
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (isError) return <p>에러 발생!</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">🎯 WIG 목록</h2>
            {wigs.map((wig: any) => (
                <WigItem key={wig.id} wig={wig} />
            ))}
        </div>
    );
}


