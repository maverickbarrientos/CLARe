const STATUS_COLORS = {
    class:    { bg: "#F97316", text: "#7c2d00" },
    reserved: { bg: "#4ADE80", text: "#14532d" },
    pending:  { bg: "#FACC15", text: "#713f12" },
    inuse:    { bg: "#60a5fa", text: "#1e3a5f" },
    in_use:   { bg: "#60a5fa", text: "#1e3a5f" },
};

const STATUS_LABELS = {
    class:    "Class",
    reserved: "Reserved",
    pending:  "Pending",
    inuse:    "In use",
    in_use:   "In use",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CELL_H = 40;
const START_HOUR = 7;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;

const SLOTS = Array.from({ length: TOTAL_HOURS }, (_, i) => {
    const h = i + START_HOUR;
    if (h === 12) return "12:00 PM";
    return h < 12 ? `${h}:00 AM` : `${h - 12}:00 PM`;
});

function timeToPixels(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return ((h - START_HOUR) * 60 + m) / 60 * CELL_H;
}

function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}

function fmtMonthDay(d) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function isSameDay(a, b) {
    return new Date(a).toDateString() === new Date(b).toDateString();
}

export function WeeklyCalendar({ events = [], currentMonday, onPrev, onNext }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const saturday = addDays(currentMonday, 5);
    const weekLabel = `${fmtMonthDay(currentMonday)} – ${fmtMonthDay(saturday)}, ${saturday.getFullYear()}`;
    const days = Array.from({ length: 6 }, (_, i) => addDays(currentMonday, i));
    const totalH = TOTAL_HOURS * CELL_H;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold text-sm text-white">{weekLabel}</span>
                <div className="flex gap-2">
                    <button onClick={onPrev} className="w-8 h-8 rounded-lg border border-[#333] text-white hover:border-glow hover:text-glow flex items-center justify-center text-sm bg-transparent">&#8592;</button>
                    <button onClick={onNext} className="w-8 h-8 rounded-lg border border-[#333] text-white hover:border-glow hover:text-glow flex items-center justify-center text-sm bg-transparent">&#8594;</button>
                </div>
            </div>
            {/* rest stays the same */}

            {/* Legend */}
            <div className="flex gap-4 flex-wrap mb-3">
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-1 font-sans text-[11px] text-gray-400">
                        <div className="w-2.5 h-2.5 rounded-sm shrink-0"
                            style={{ background: STATUS_COLORS[key].bg }} />
                        {label}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="overflow-auto border border-glow rounded-xl max-h-90 [&::-webkit-scrollbar]:hidden">
                <div style={{ width: "100%" }}> 

                    {/* Day headers */}
                    <div className="grid sticky top-0 z-20 bg-black border-b-2 border-[#222]"
                        style={{ gridTemplateColumns: "64px repeat(6, 1fr)" }}>
                        <div className="border-r-2 border-[#222]" />
                        {days.map((date, i) => {
                            const isToday = isSameDay(date, today);
                            return (
                                <div key={i}
                                    className="text-center py-2 px-1 border-r-2 border-[#222] last:border-r-0"
                                    style={{ borderBottom: isToday ? "2px solid #F97316" : undefined }}>
                                    <p className="font-heading font-bold text-[11px] text-[#888] uppercase tracking-wide">
                                        {DAYS[i]}
                                    </p>
                                    <p className="font-heading font-bold text-[17px] mt-0.5"
                                        style={{ color: isToday ? "#F97316" : "#fff" }}>
                                        {date.getDate()}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Body */}
                    <div className="grid" style={{ gridTemplateColumns: "64px repeat(6, 1fr)" }}>

                        {/* Time column */}
                        <div className="border-r-2 border-[#1a1a1a]">
                            {SLOTS.map((slot, i) => (
                                <div key={i}
                                    className="font-heading font-bold text-[10px] text-[#666] px-2 pt-1 border-b-2 border-[#1a1a1a] last:border-b-0"
                                    style={{ height: CELL_H }}>
                                    {slot}
                                </div>
                            ))}
                        </div>

                        {/* Day columns */}
                        {days.map((date, di) => {
                            const isToday = isSameDay(date, today);
                            const dayEvents = events.filter(ev => ev.day === di);

                            return (
                                <div key={di}
                                    className="relative border-r-2 border-[#1a1a1a] last:border-r-0"
                                    style={{
                                        height: totalH,
                                        background: isToday ? "rgba(249,115,22,0.04)" : undefined
                                    }}>

                                    {/* Hour lines */}
                                    {Array.from({ length: TOTAL_HOURS }).map((_, i) => (
                                        <div key={i}
                                            className="absolute left-0 right-0 border-b-2 border-[#1a1a1a] pointer-events-none"
                                            style={{ top: i * CELL_H }} />
                                    ))}

                                    {/* Events */}
                                    {dayEvents.map((ev, ei) => {
                                        const c = STATUS_COLORS[ev.status];
                                        const top = timeToPixels(ev.start);
                                        const height = timeToPixels(ev.end) - top;
                                        return (
                                            <div key={ei}
                                                className="absolute left-0.75 right-0.75 rounded-sm px-1.5 font-sans text-[11px] font-medium overflow-hidden"
                                                style={{
                                                    top: top + 2,
                                                    height: height - 4,
                                                    background: c.bg,
                                                    color: c.text,
                                                }}>
                                                {STATUS_LABELS[ev.status]}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}