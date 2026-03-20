import { View, Text } from "react-native"

interface LabsCardProps {
    labName: string
    status: string
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
    }, cancelled : {
        color: "text-muted",
        label: "CANCELLED"
    }
}

export function LabsCard ({ labName, status } : LabsCardProps) {

    const config = statusConfig[status ?? "available"]

    return (
        <View className="border border-glow p-4 mr-2 rounded-lg">
            <Text className="font-heading color-white">{ labName }</Text>
            <Text className={`font-heading ${config.color}`}>{ config.label }</Text>
        </View>
    )
}