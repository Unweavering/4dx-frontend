type Wig = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
};

export default function WigItem({ wig }: { wig: Wig }) {
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-xl font-bold">{wig.title}</h3>
            <p className="text-gray-700 mt-1">{wig.description}</p>
            <p className="text-sm text-gray-500 mt-2">마감일: {wig.dueDate}</p>
        </div>
    );
}
