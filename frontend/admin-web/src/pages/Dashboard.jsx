import { PageTitle } from "../components/PageTitle";
import { Card } from "../components/Card";
import { Modal } from "../components/shared/Modal";
import { useDashboard } from "../hooks/useDashboard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const STATUS_STYLES = {
    reserved: "text-success",
    pending:  "text-warning",
    in_use:   "text-info",
};

const STATUS_LABELS = {
    reserved: "RESERVED",
    pending:  "PENDING",
    in_use:   "IN USE",
};

export function Dashboard() {

    const { dashboard, error, loading } = useDashboard();

    const chartData = {
        labels: dashboard?.chart?.map((d) => d.date) ?? [],
        datasets: [
            {
                label: "Reservations",
                data: dashboard?.chart?.map((d) => d.count) ?? [],
                borderColor: "#FF6E01",
                backgroundColor: "rgba(255, 110, 1, 0.1)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#FF6E01",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                bodyFont: { family: "Inter" },
                callbacks: {
                    label: (ctx) => ` ${ctx.parsed.y} reservations`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#CCCCCC", font: { family: "Inter" } },
                grid: { color: "rgba(255,255,255,0.05)" },
            },
            y: {
                ticks: { color: "#CCCCCC", font: { family: "Inter" }, stepSize: 1 },
                grid: { color: "rgba(255,255,255,0.05)" },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col gap-10">
            <title>CLARe | Dashboard</title>

            {loading && (
                <Modal
                    type="loading"
                    title="Loading Dashboard"
                    subTitle="Please wait while we fetch dashboard data."
                />
            )}

            {error && (
                <Modal
                    type="error"
                    title="Something went wrong"
                    subTitle="Failed to load dashboard data."
                    onClose={() => window.location.reload()}
                />
            )}

            <PageTitle pageTitle="Dashboard" />

            <div className="grid grid-cols-3 gap-7">

                {/* MOST USED LAB */}
                <Card cardTitle="MOST USED LAB">
                    <div className="flex flex-col text-left justify-center h-3/5 gap-1 font-sans">
                        <p className="text-white font-heading font-bold text-xl">
                            {dashboard?.most_used_lab?.lab_name ?? "—"}
                        </p>
                        <p className="text-secondary text-sm">
                            {dashboard?.most_used_lab?.count ?? 0} reservations (Last 7 days)
                        </p>
                    </div>
                </Card>

                {/* RESERVATIONS */}
                <Card cardTitle="RESERVATIONS">
                    <div className="flex flex-col gap-2 font-sans">
                        {Object.entries(STATUS_LABELS).map(([key, label]) => (
                            <div key={key} className="bg-medium-gray px-3 py-2 rounded-md flex justify-between items-center">
                                <span className="text-white text-sm">{label}</span>
                                <span className={`font-heading font-bold text-sm ${STATUS_STYLES[key]}`}>
                                    {dashboard?.reservations?.[key] ?? 0}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ACTIVE RESERVATIONS */}
                <Card cardTitle="ACTIVE RESERVATIONS" className="row-span-2">
                    <div className="flex flex-col gap-2 font-sans overflow-y-hidden">
                        {!loading && dashboard?.active_reservations?.length === 0 && (
                            <p className="text-secondary text-sm">No active reservations.</p>
                        )}
                        {dashboard?.active_reservations?.map((res) => (
                            <div key={res.id} className="bg-medium-gray text-left p-3 rounded-md flex flex-col gap-1">
                                <p className="text-white font-heading font-bold text-sm">{res.full_name}</p>
                                <p className="text-secondary text-xs">{res.lab_name}</p>
                                <p className="text-secondary text-xs">{res.date}</p>
                                <span className={`text-xs font-bold ${STATUS_STYLES[res.status]}`}>
                                    {STATUS_LABELS[res.status] ?? res.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* CHART */}
                <Card cardTitle="COMPUTER LAB ANALYTICS" className="col-span-2">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 font-sans">
                            <span className="inline-block w-3 h-3 rounded-full bg-glow"></span>
                            <p className="text-secondary text-xs">Number of reservations per day (Last 7 days)</p>
                        </div>
                        <div className="h-52">
                            {!loading && <Line data={chartData} options={chartOptions} />}
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}