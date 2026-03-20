import { Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScreenTitle } from '@/components/ScreenTitle'
import { StatusCard } from '@/components/StatusCard'
import { ReservationActionButton } from '@/components/ReservationActionButton'
import { Modal } from '@/components/Modal'
import { useReservation } from '@/hooks/useReservation'
import { useLocalSearchParams } from 'expo-router'
import { Image } from "expo-image";
import { useAuth } from "@/hooks/useAuth";

const ViewReservation = () => {

  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { reservation, loading, error } = useReservation(Number(id));
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  console.log(reservation)

  return (
    <SafeAreaProvider>
      <View className='flex-1 bg-black p-5'>

        <Modal visible={loading} type="loading" title="Loading Reservation" subTitle="Please wait..." />
        <Modal visible={!!error} type="error" title="Something went wrong" subTitle="Failed to load reservation." />

        <ScreenTitle pageTitle='VIEW RESERVATION' userName={fullName} />

        {reservation && (
          <View className='flex flex-col'>
            <StatusCard status={reservation.status} />

            {reservation.status === "rejected" && (
              <View className='items-center'>
                <Text className='text-white font-heading text-xl'>{reservation.reject_reason}</Text>
              </View>
            )}

            {reservation.status === "reserved" && (
              <View className='my-5 items-center'>
                <View className='p-3 border border-glow my-5 rounded-2xl' style={{ padding: 11, width: 200 }}>
                  <Image source={{ uri: reservation.qr_codes.image_url }} style={{ width: 175, height: 175 }} />
                </View>
                <View>
                  <Text className={`font-heading text-xl ${reservation.qr_codes.status === "valid" ? "text-success" : "text-danger"}`}>
                    {reservation.qr_codes.status.toUpperCase()}
                  </Text>
                  <Text className='font-subheading text-md text-white'>
                    Date Issued: <Text className='font-heading'>{reservation.qr_codes.issue_date}</Text>
                  </Text>
                  <Text className='font-subheading text-md text-white'>
                    Expiry Date: <Text className='font-heading'>{reservation.qr_codes.expiry_date}</Text>
                  </Text>
                </View>
              </View>
            )}

            <View className='relative text-left border border-glow shadow-glow p-5 rounded-2xl my-2'>
              <Text className="font-heading text-xl color-white">{reservation.computer_labs.lab_name}</Text>
              <Text className="font-subheading color-white">{reservation.computer_labs.location}</Text>
              <Text className="font-heading color-white">{`${reservation.start_date} - ${reservation.end_date}`}</Text>
            </View>

            <ReservationActionButton status={reservation.status} reservationId={reservation.id} />
          </View>
        )}

      </View>
    </SafeAreaProvider>
  )
}

export default ViewReservation