import ResultDashboard from "@/components/ResultDashboard";

export default function ResultPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <ResultDashboard id={params.id} />
            </div>
        </div>
    );
}
