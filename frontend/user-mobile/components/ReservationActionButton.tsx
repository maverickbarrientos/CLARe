import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native"

interface ActionButtonProps {
    status: string
    reservationId: number 
}

export function ReservationActionButton ({ status, reservationId } : ActionButtonProps) {

    const router = useRouter();

    if (["reserved", "in_use"].includes(status)) {
        console.log("IF CONDITION", status);
        return (
            <View className="w-full flex-row justify-center">
                <TouchableOpacity onPress={() => router.push(`/reservations/${reservationId}/cancellation_form`)}
                    className="bg-danger w-full px-4 py-3 font-heading rounded-lg hover:bg-red-600">
                    <Text className="text-white text-center font-heading">CANCEL RESERVATION</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        console.log("ELSE CONDITION", status);
        return (
            <View className="w-full flex-row" style={{ gap: 8 }}>
                <TouchableOpacity onPress={() => router.push(`/reservations/${reservationId}/edit_reservation`)}
                    className="flex-1 bg-gray px-4 py-2 font-heading rounded-lg hover:bg-red-600">
                    <Text className="text-white text-center font-heading">EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-danger px-4 py-2 font-heading rounded-lg hover:bg-red-600">
                    <Text className="text-white text-center font-heading">DELETE</Text>
                </TouchableOpacity>
            </View>
        )
    }
}