import { View, Text } from "react-native"

interface MiniCardProps {
    computerLab: string
    status: string
    time: string
}

const statusConfig: Record<string, {color: string, label: string}> = {
    reserved: {
        color: "success",
        label: "RESERVED"
    }, pending: {
        color: "warning",
        label: "PENDING"
    }
}

export function ReservationMiniCard ({ computerLab, status, time } : MiniCardProps) {

    const config = statusConfig[status]

    return ( 
        <View className={`relative text-left border border-glow shadow-glow p-5 rounded-2xl my-5`}>
            <Text className="font-heading text-xl color-white">{computerLab}</Text>
            <Text className="text-sm text-secondary color-white">{time}</Text>
            <Text className={`font-heading text-xl color-warning`}>{config.label}</Text>
        </View>
    )

}