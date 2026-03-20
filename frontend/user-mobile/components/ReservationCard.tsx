import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface ReservationCardProps {
    computerLab: string;
    name: string;
    department: string;
    time: string;
    status: string;
    reservationId: number
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

export function ReservationCard ({ computerLab, name, department, time, status, reservationId }: ReservationCardProps) {

    const router = useRouter();
    const config = statusConfig[status]

    return (
        <View className={`relative text-left border border-glow shadow-glow p-5 rounded-2xl my-5`}>
  
            <Text className="font-heading text-3xl color-white">{computerLab}</Text>
            <Text className="color-white font-sans">{name}</Text>
            <Text className="color-white font-sans">{department}</Text>
            <Text className="text-sm text-secondary color-white">{time}</Text>
            <Text className={`font-heading text-xl ${config.color}`}>{config.label}</Text>

            <TouchableOpacity onPress={() => { console.log("RESERVATION CARDDD", reservationId); router.push(`/reservations/${reservationId}/`);}}
                className="absolute bottom-5 right-5 px-4 py-1 border-2 align-middle justify-center rounded-full border-glow text-glow">
                <Text className="text-glow font-bold text-xl">{"›"}</Text>
            </TouchableOpacity>

        </View>


    )

}