import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { ScreenTitle } from '@/components/ScreenTitle'
import { Modal } from '@/components/Modal'
import { useReservation } from '@/hooks/useReservation'
import { DateTimePicker } from '@/components/DateTimePicker'
import { useUpdateReservation } from '@/hooks/useUpdateReservation'
import { formatNaive } from '@/utilities/dateUtils'

const EditReservation = () => {

    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { reservation, error, loading } = useReservation(Number(id));
    const { update, loading: updateLoading, error: updateError } = useUpdateReservation();

    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (reservation) {
            setDescription(reservation.reservation_description);
            setStartDate(new Date(reservation.start_date));
            setEndDate(new Date(reservation.end_date));
        }
    }, [reservation]);

    const handleSubmit = async () => {
        await update(reservation?.id, {
            lab_id: reservation?.computer_labs.id,
            reservation_description: description,
            start_date: formatNaive(startDate),
            end_date: formatNaive(endDate)
        });
    }

    return (
        <SafeAreaProvider>
            <View className="flex-1 bg-black p-5">

                <Modal visible={loading} type="loading" title="Loading Reservation" subTitle="Please wait..." />
                <Modal visible={updateLoading} type="loading" title="Updating Reservation" subTitle="Please wait..." />
                <Modal visible={!!(error || updateError)} type="error" title="Something went wrong" subTitle="Failed to update reservation." />

                <ScreenTitle pageTitle='EDIT RESERVATION' />

                {reservation && (
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
                            <Text className="text-white text-center font-heading text-xl">UPDATE</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </SafeAreaProvider>
    )
}

export default EditReservation