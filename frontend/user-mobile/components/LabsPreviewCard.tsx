import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface PreviewCardProps {
    labName: string
    capacity: string
    location: string
    status: string
    labID: number
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
    }
}

export function LabsPreviewCard ({ labName, capacity, location, status, labID } : PreviewCardProps) {

    const router = useRouter();
    const config = statusConfig[status]

    return (

        <View className="border border-glow p-4 my-2 rounded-lg shadow-glow">
            <Text className="font-heading color-white">{ labName }</Text>
            <Text className="font-subheading color-white">{ location }</Text>
            <Text className="font-subheading color-white">{ capacity }</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text className={`font-heading ${config.color}`}>{ config.label }</Text>
                <TouchableOpacity onPress={() => router.push({ pathname : "/computer_labs/[lab_id]", params: {lab_id: labID} })}>
                    <Text className="text-glow">View Availability →</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}