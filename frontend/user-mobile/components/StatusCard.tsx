import { View, Text } from 'react-native'

interface ReservationStatus {
    label: string,
    message: string,
    color: string
    border: string
}

interface StatusCardProps {
    status: string
}

const statusConfig: Record<string, ReservationStatus> = {
    pending: { 
        label: "PENDING", 
        message: "waiting for approval", 
        color: "warning",
        border: "border-warning"
    },
    cancellation_requested: { 
        label: "CANCELLATION REQUESTED", 
        message: "cancellation request under review", 
        color: "warning",
        border: "border-warning"
    },
    reserved: { 
        label: "RESERVED", 
        message: "reservation confirmed", 
        color: "success",
        border: "border-success"
    },
    rejected: { 
        label: "REJECTED", 
        message: "reservation has been rejected", 
        color: "danger",
        border: "border-danger"
    },
    in_use: { 
        label: "IN USE", 
        message: "currently in use", 
        color: "info",
        border: "border-info"
    },
    cancelled: { 
        label: "CANCELLED", 
        message: "reservation has been cancelled", 
        color: "muted",
        border: "border-muted"
    },
    completed: { 
        label: "COMPLETED", 
        message: "session completed", 
        color: "teal",
        border: "border-teal"
    },
};

export function StatusCard({ status } : StatusCardProps) {
    const config = statusConfig[status];

    if (!config) return null;

    return (
        <View className={`col-span-1 w-full bg-dark_gray border ${config.border} p-4 rounded-lg items-center`}>
            <Text className={`text-${config.color} font-heading text-xl`}>{config.label}</Text>
            <Text className="text-secondary font-heading text-white">{config.message}</Text>
        </View>
    );
}