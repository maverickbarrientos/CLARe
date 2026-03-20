import { NavLink } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle"
import { useReservations } from '../../hooks/reservations/useReservations';
import { formatSchedule } from "../../utils/dateFormatter";
import { WeeklyCalendar } from "../../components/shared/WeeklyCalendar";
import { useWeeklyEvents } from "../../hooks/reservations/useWeeklyEvents";
import { Modal } from "../../components/shared/Modal";
import { useDashboard } from "../../hooks/useDashboard";

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

const statusConfig = {
    pending:                { label: "PENDING",                color: "warning" },
    cancellation_requested: { label: "CANCELLATION REQUESTED", color: "warning" },
    reserved:               { label: "RESERVED",              color: "success" },
    rejected:               { label: "REJECTED",              color: "danger"  },
    in_use:                 { label: "IN USE",                color: "info"    },
    cancelled:              { label: "CANCELLED",             color: "muted"   },
    completed:              { label: "COMPLETED",             color: "teal"    },
};

export function Reservations() {

    const { reservations, search, setSearch, error, loading: reservationLoading } = useReservations();
    const { events, currentMonday, goToPrev, goToNext, loading: eventsLoading } = useWeeklyEvents();
    const { dashboard, loading: dashboardLoading } = useDashboard();

    return (
        <div className="flex flex-col gap-10">
            <title>CLARe | Reservations</title>

            {(reservationLoading || eventsLoading) && (
                <Modal type="loading" title="Processing" subTitle="Please wait while we retrieve reservation details." />
            )}

            <PageTitle pageTitle="Reservations" />

            {/* CALENDAR + ACTIVE RESERVATIONS */}
            <div className="grid grid-cols-3 gap-5">

                <div className="col-span-2 border-global p-5 rounded-2xl font-sans">
                    <WeeklyCalendar
                        events={events}
                        currentMonday={currentMonday}
                        onPrev={goToPrev}
                        onNext={goToNext}
                    />
                </div>

                <div className="col-span-1 border-glow p-5 rounded-2xl font-sans flex flex-col gap-3" style={{ height: 0, minHeight: "100%" }}>
                    <p className="font-heading font-bold text-white text-left">ACTIVE RESERVATIONS</p>

                    <div className="flex flex-col gap-2 overflow-y-scroll flex-1 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {dashboardLoading ? (
                            <p className="text-secondary text-sm">Loading...</p>
                        ) : dashboard?.active_reservations?.length === 0 ? (
                            <p className="text-secondary text-sm">No active reservations.</p>
                        ) : (
                            dashboard?.active_reservations?.map((res) => (
                                <div key={res.id} className="bg-medium-gray text-left p-3 rounded-md flex flex-col gap-1">
                                    <p className="text-white font-heading font-bold text-sm">{res.full_name}</p>
                                    <p className="text-secondary text-xs">{res.lab_name}</p>
                                    <p className="text-secondary text-xs">{res.date}</p>
                                    <span className={`text-xs font-bold ${STATUS_STYLES[res.status]}`}>
                                        {STATUS_LABELS[res.status] ?? res.status}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>

            {/* SEARCH & FILTER */}
            <div className="grid grid-cols-5 gap-5">
                <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search Reservation"
                    className="col-span-2 border-global p-2 rounded-lg font-sans"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input type="date" className="col-span-1 border-global p-2 rounded-lg font-sans" />
                <button className="col-span-1 border-glow p-2 rounded-lg font-heading font-bold">Filter</button>
                <NavLink to="/choose_lab">
                    <button className="col-span-1 border w-full py-2 rounded-lg font-heading font-bold border-glow bg-glow">
                        Add Reservation
                    </button>
                </NavLink>
            </div>

            {/* RESERVATIONS TABLE */}
            <div className="border rounded-2xl border-glow">
                <table className="w-full text-left [&_th]:p-4 [&_td]:p-4">
                    <thead className="font-bold font-heading border-b-stroke">
                        <tr>
                            <th>Computer Lab</th>
                            <th>Full Name</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y font-sans">
                        {reservations.map((reservation) => {
                            const status = statusConfig[reservation.status];
                            return (
                                <tr key={reservation.id}>
                                    <td>{reservation.computer_labs.lab_name}</td>
                                    <td>{reservation.full_name}</td>
                                    <td className="text-sm">{formatSchedule(reservation.start_date, reservation.end_date)}</td>
                                    <td className="font-heading font-bold text-xs">
                                        <div className={`rounded-full bg-dark-gray border-${status?.color} text-center p-1`}>
                                            <p className={`text-${status?.color}`}>{status?.label}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <NavLink to={`/update_reservation/${reservation.id}`}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </NavLink>
                                        <NavLink to={`/reservation/${reservation.id}`}>
                                            <span className="material-symbols-outlined">visibility</span>
                                        </NavLink>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}