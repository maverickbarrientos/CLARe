import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { ScreenTitle } from '@/components/ScreenTitle'
import { useComputerLab } from '@/hooks/useComputerLab'
import { DetailsPanel } from '@/components/DetailsPanel'
import { ReservationMiniCard } from '@/components/ReservationMiniCard'
import { Modal } from '@/components/Modal'
import { dateFormatter } from '@/utilities/dateUtils'
import { useAuth } from "@/hooks/useAuth";

const ViewLab = () => {

  const router = useRouter();
  const { computerLab, error, loading } = useComputerLab();
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  console.log(computerLab?.id);

  return (
    <View className='flex-1 bg-black p-5'>

      <Modal visible={loading} type="loading" title="Loading Lab" subTitle="Please wait..." />
      <Modal visible={!!error} type="error" title="Something went wrong" subTitle="Failed to load lab details." />

      {computerLab && (
        <>
          <ScreenTitle pageTitle={computerLab.lab_name} userName={fullName} />

          <View className='my-2'>
            <Text className="color-white font-subheading text-2xl">Lab Information</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <DetailsPanel title="Location" content={computerLab.location} />
              <DetailsPanel title="Capacity" content={computerLab.capacity} />
            </View>
          </View>

          <View className='h-1/2 my-2'>
            <Text className="text-white font-subheading text-2xl">Lab Reservations</Text>
            <View className='px-4 py-6 border border-glow my-2 rounded-xl'>
              <ScrollView>
                {computerLab.reservations.length > 0 ?
                  computerLab.reservations.map((reservation) => (
                    <ReservationMiniCard
                      key={reservation.id}
                      computerLab={computerLab.lab_name}
                      status={reservation.status}
                      time={`${dateFormatter(new Date(reservation.start_date))} - ${dateFormatter(new Date(reservation.end_date))}`}
                    />
                  )) :
                  !loading && <Text className="text-white font-sans">No Reservations yet</Text>
                }
              </ScrollView>
            </View>
          </View>

          <TouchableOpacity
            className="px-4 py-2 my-2 border align-middle justify-center rounded-xl bg-glow border-glow"
            onPress={() => router.push({ pathname: `/reservations/reservation_form`, params: { lab_id: computerLab.id } })}
          >
            <Text className="shadow-black font-heading text-center text-xl">RESERVE LAB</Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  )
}

export default ViewLab