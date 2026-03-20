import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenTitle } from "@/components/ScreenTitle";
import { ReservationCard } from '@/components/ReservationCard';
import { ReservationMiniCard } from '@/components/ReservationMiniCard';
import { Modal } from '@/components/Modal';
import { useRouter } from 'expo-router';
import { useReservation } from '@/hooks/useReservation';
import { useUserReservations } from "@/hooks/useUserReservations"
import { useAuth } from "@/hooks/useAuth";

const Reservations = () => {

  const router = useRouter();
  const { reservation, error, loading } = useReservation();
  const { userReservations, error: userReservationError, loading: userReservationLoading } = useUserReservations();
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  return (
    <SafeAreaProvider>
      <ScrollView className="flex-1 bg-black p-5">

        <Modal visible={loading || userReservationLoading} type="loading" title="Loading Reservations" subTitle="Please wait..." />
        <Modal visible={!!(error || userReservationError)} type="error" title="Something went wrong" subTitle="Failed to load reservations." />

        <ScreenTitle pageTitle="RESERVATIONS" userName={fullName} />

        {reservation && (
          <View className='my-2'>
            <Text className="color-white font-subheading text-2xl">Current Reservation</Text>
            <ReservationCard
              computerLab={reservation.computer_labs.lab_name}
              name={reservation.full_name}
              department={reservation.department}
              time={`${reservation.start_date} - ${reservation.end_date}`}
              status={reservation.status}
              reservationId={reservation.id}
            />
          </View>
        )}

        <View className='my-2'>
          <Text className="color-white font-subheading text-2xl">Previous Reservations</Text>
          {userReservations?.length > 0 ?
            userReservations.map((reservation) => (
              <ReservationMiniCard
                key={reservation.id}
                computerLab={reservation.computer_labs.lab_name}
                status={reservation.status}
                time={`${reservation.start_date} - ${reservation.end_date}`}
              />
            )) :
            !userReservationLoading && (
              <Text className="text-glow text-center font-heading">No reservations yet!</Text>
            )
          }
        </View>

        <TouchableOpacity
          className="px-4 py-2 border align-middle justify-center rounded-xl bg-glow border-glow"
          onPress={() => router.push("/computer_labs")}
        >
          <Text className="shadow-black font-heading text-center text-xl">RESERVE A LAB</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Reservations