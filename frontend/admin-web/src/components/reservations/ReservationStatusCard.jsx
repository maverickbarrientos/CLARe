const statusConfig = {
    pending: { 
        label: "PENDING", 
        message: "waiting for approval", 
        color: "warning" 
    },
    cancellation_requested: { 
        label: "CANCELLATION REQUESTED", 
        message: "cancellation request under review", 
        color: "warning" 
    },
    reserved: { 
        label: "RESERVED", 
        message: "reservation confirmed", 
        color: "success" 
    },
    rejected: { 
        label: "REJECTED", 
        message: "reservation has been rejected", 
        color: "danger" 
    },
    in_use: { 
        label: "IN USE", 
        message: "currently in use", 
        color: "info" 
    },
    cancelled: { 
        label: "CANCELLED", 
        message: "reservation has been cancelled", 
        color: "muted" 
    },
    completed: { 
        label: "COMPLETED", 
        message: "session completed", 
        color: "teal" 
    },
};

export function ReservationStatusCard({ status }) {
    const config = statusConfig[status];

    if (!config) return null;

    return (
        <div className={`col-span-1 max-h-fit flex gap-3 bg-dark-gray border-${config.color} p-4 rounded-lg items-center`}>
            <p className={`font-bold text-${config.color} font-heading text-xl`}>{config.label}</p>
            <p className="text-secondary font-heading"> - {config.message}</p>
        </div>
    );
}