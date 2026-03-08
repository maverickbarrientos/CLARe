import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenTitle } from "@/components/ScreenTitle";
import { ReservationCard } from '@/components/ReservationCard';
import { ReservationMiniCard } from '@/components/ReservationMiniCard';

const Reservations = () => {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black p-5">

        <ScreenTitle pageTitle="Reservations" />

        <Text className="color-white font-subheading text-2xl">Current Reservation</Text>
        <ReservationCard computerLab="Computer Lab 7" name="Jessille Baito"
          department="CITE" time="March 4, 2026 10:00 A.M. - 12:00 P.M."
          status="pending"
        />

        <Text className="color-white font-subheading text-2xl">Previous Reservations</Text>
        <ReservationMiniCard computerLab="Computer Lab 7"
          time="March 4, 2026 10:00 A.M. - 12:00 P.M." status="pending"
        />

        <TouchableOpacity className="px-4 py-2 border align-middle justify-center rounded-xl bg-glow border-glow">
          <Text className="shadow-black font-heading text-center text-xl">RESERVE A LAB</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

export default Reservations
