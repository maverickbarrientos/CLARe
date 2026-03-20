import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScreenTitle } from '@/components/ScreenTitle'
import { Modal } from '@/components/Modal'
import { useState } from 'react'
import { useReservation } from '@/hooks/useReservation'
import { useCancelReservation } from '@/hooks/useCancelReservation'
import { ReservationMiniCard } from '@/components/ReservationMiniCard'
import { useLocalSearchParams } from 'expo-router'

const CancellationForm = () => {

    const params = useLocalSearchParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const { reservation, error, loading } = useReservation(Number(id));
    const { createCancellation, loading: cancellationLoading, error: cancellationError } = useCancelReservation();

    const [reason, setReason] = useState("");

    const handleSubmit = async () => {
        await createCancellation({
            reservation_id: reservation?.id,
            cancellation_reason: reason
        });
    }

    return (
        <SafeAreaProvider>
            <View className='flex-1 bg-black p-5'>

                <Modal visible={loading} type="loading" title="Loading Reservation" subTitle="Please wait..." />
                <Modal visible={cancellationLoading} type="loading" title="Submitting Request" subTitle="Please wait..." />
                <Modal visible={!!(error || cancellationError)} type="error" title="Something went wrong" subTitle={cancellationError} />

                <ScreenTitle pageTitle='CANCELLATION FORM' />

                {reservation && (
                    <View>
                        <View>
                            <Text className="font-subheading text-white py-2 text-xl">Computer Lab</Text>
                            <ReservationMiniCard
                                status={reservation.status}
                                time={`${reservation.start_date} - ${reservation.end_date}`}
                                computerLab={reservation.computer_labs.lab_name}
                            />
                        </View>

                        <View className="my-2">
                            <Text className="font-subheading text-white py-2 text-xl">Cancellation Reason</Text>
                            <TextInput
                                className="border border-glow rounded-lg px-4 h-28 w-full text-white"
                                placeholderTextColor="#9ca3af"
                                placeholder="Set cancellation reason"
                                multiline={true}
                                numberOfLines={10}
                                textAlignVertical="top"
                                value={reason}
                                onChangeText={setReason}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className='border border-glow shadow-glow bg-glow rounded-lg py-2'
                        >
                            <Text className='font-heading text-xl text-center'>REQUEST CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </SafeAreaProvider>
    )
}

export default CancellationForm