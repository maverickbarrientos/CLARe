import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useComputerLab } from "@/hooks/useComputerLab";
import { ScreenTitle } from "@/components/ScreenTitle";
import { DateTimePicker } from "@/components/DateTimePicker";
import { useCreateReservation } from "@/hooks/useCreateReservation";
import { Modal } from "@/components/Modal";
import { formatNaive } from "@/utilities/dateUtils";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

function ReservationForm() {

    const router = useRouter();
    const { create, error: createError } = useCreateReservation();
    const { socketio, isConnected } = useSocket();
    const { computerLab, error: labError, loading } = useComputerLab();
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
    const firstName = user?.users_information?.first_name;
    const lastName = user?.users_information?.last_name;
    const fullName = `${firstName} ${lastName}`;

    const handleSubmit = async () => {
        if (!computerLab) return;
        setSubmitting(true);

        socketio.emit("user_create_reservation", {
            lab_id: computerLab.id,
            reservation_description: description,
            start_date: formatNaive(startDate),
            end_date: formatNaive(endDate)
        });

        socketio.once("new_reservation", () => {
            setSubmitting(false);
            router.push("/home");
        });
    }

    return (
        <View className="flex-1 bg-black p-4">

            <Modal visible={loading} type="loading" title="Loading Lab" subTitle="Please wait..." />
            <Modal visible={!!(createError || labError)} type="error" title="Something went wrong" subTitle="Failed to load reservation form." />
            <Modal visible={submitting} type="loading" title="Submitting Reservation" subTitle="Please wait..." />

            <ScreenTitle pageTitle="RESERVATION FORM" userName={fullName} />

            {computerLab && (
                <>
                    <View>
                        <Text className="font-subheading text-white px-2">Chosen Computer Lab</Text>
                        <View className="relative text-left border border-glow shadow-glow p-5 rounded-2xl my-2">
                            <Text className="font-heading text-xl color-white">{computerLab.lab_name}</Text>
                            <Text className="font-subheading text-xl color-white">{computerLab.location}</Text>
                        </View>
                    </View>

                    <View>
                        <View className="my-2">
                            <Text className="font-subheading text-white px-2">Reservation Description</Text>
                            <TextInput
                                className="border border-glow rounded-lg px-4 h-28 w-full text-white"
                                placeholderTextColor="#9ca3af"
                                placeholder="Set reservation details"
                                multiline={true}
                                numberOfLines={10}
                                textAlignVertical="top"
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <View>
                            <View>
                                <Text className="font-subheading text-white px-2">Start Date</Text>
                                <DateTimePicker
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    minDate={new Date()}
                                    placeholder="Select start date & time"
                                />
                            </View>
                            <View>
                                <Text className="font-subheading text-white px-2">End Date</Text>
                                <DateTimePicker
                                    value={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    minDate={startDate}
                                    placeholder="Select end date & time"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="border border-glow bg-glow rounded-lg py-3 my-4"
                        >
                            <Text className="text-white text-center font-heading text-xl">RESERVE</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

        </View>
    )
}

export default ReservationForm