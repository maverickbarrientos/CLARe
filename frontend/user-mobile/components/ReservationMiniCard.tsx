import { View, Text } from "react-native"

interface MiniCardProps {
    computerLab: string
    status: string
    time: string
}

const statusConfig: Record<string, {color: string, label: string}> = {
    reserved: {
        color: "text-success",
        label: "RESERVED"
    }, pending : {
        color: "text-warning",
        label: "PENDING"
    }, rejected : {
        color: "text-danger",
        label: "REJECTED"
    }, in_use : {
        color: "text-info",
        label: "IN USE"
    }, available : {
        color: "text-teal",
        label: "AVAILABLE"
    }, cancellation_requested : {
        color: "text-warning",
        label: "CANCELLATION REQUESTED"
    }, cancelled : {
        color: "text-muted",
        label: "CANCELLED"
    }
}

export function ReservationMiniCard ({ computerLab, status, time } : MiniCardProps) {

    const config = statusConfig[status]

    return ( 
        <View className={`relative text-left border border-glow shadow-glow p-5 rounded-2xl my-2`}>
            <Text className="font-heading text-xl color-white">{computerLab}</Text>
            <Text className="text-sm text-secondary color-white">{time}</Text>
            <Text className={`font-heading text-xl ${config.color}`}>{config.label}</Text>
        </View>
    )

}