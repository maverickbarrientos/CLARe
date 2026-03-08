import { View, Text } from "react-native"

interface LabsCardProps {
    labName: string
    status: string
}

const statusConfig: Record<string, {color: string, label: string}> = {
    reserved: {
        color: "success",
        label: "RESERVED"
    }, pending : {
        color: "warning",
        label: "PENDING"
    }
}

export function LabsCard ({ labName, status } : LabsCardProps) {

    const config = statusConfig[status]

    return (
        <View className="border border-glow p-4 mr-2 rounded-lg">
            <Text className="font-heading color-white">{ labName }</Text>
            <Text className={`font-heading color-${config.color}`}>{ config.label }</Text>
        </View>
    )

}