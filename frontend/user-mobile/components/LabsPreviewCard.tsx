import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface PreviewCardProps {
    labName: string
    capacity: string
    location: string
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

export function LabsPreviewCard ({ labName, capacity, location, status } : PreviewCardProps) {

    const router = useRouter();
    const config = statusConfig[status]

    return (

        <View className="border border-glow p-4 my-2 rounded-lg shadow-glow">
            <Text className="font-heading color-white">{ labName }</Text>
            <Text className="font-subheading color-white">{ location }</Text>
            <Text className="font-subheading color-white">{ capacity }</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text className={`font-heading color-${config.color}`}>{ config.label }</Text>
                <TouchableOpacity onPress={() => router.push("/")}>
                    <Text className="text-glow">View Availability →</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}