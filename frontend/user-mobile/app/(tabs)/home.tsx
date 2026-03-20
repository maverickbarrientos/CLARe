import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ScreenTitle } from "@/components/ScreenTitle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReservationCard } from "@/components/ReservationCard";
import { LabsCard } from "@/components/LabsCard";
import { Modal } from "@/components/Modal";
import { useReservation } from "@/hooks/useReservation";
import { useComputerLabs } from "@/hooks/useComputerLabs";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {

  const router = useRouter();
  const { reservation, error: reservationError, loading: reservationLoading } = useReservation();
  const { computerLabs, error: labError, loading: labLoading } = useComputerLabs();
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  console.log("HOMEEEE", reservation, "IDDDD", reservation?.id)

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black p-5">

        <Modal visible={reservationLoading || labLoading} type="loading" title="Loading" subTitle="Please wait..." />
        <Modal visible={!!(reservationError || labError)} type="error" title="Something went wrong" subTitle="Failed to load data." />

        <ScreenTitle pageTitle="HOME" userName={fullName} />

        <View>
          {reservation ?
            <View>
              <Text className="color-white font-subheading text-3xl">Your Reservations</Text>
              <ReservationCard
                computerLab={reservation.computer_labs.lab_name}
                name={reservation.full_name}
                department={reservation.user.users_information.department}
                time={`${reservation.start_date} - ${reservation.end_date}`}
                status={reservation.status}
                reservationId={reservation.id}
              />
            </View> :
            <View className="p-4">
              <Text className="text-glow text-center font-heading">
                No reservations yet!
              </Text>
              <TouchableOpacity
                className="px-4 py-2 my-2 border align-middle justify-center rounded-xl bg-glow border-glow"
                onPress={() => router.push("/computer_labs")}
              >
                <Text className="shadow-black font-heading text-center text-xl">RESERVE A LAB</Text>
              </TouchableOpacity>
            </View>
          }

          <View>
            <Text className="text-white font-heading text-xl">Computer Labs</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="my-5"
            >
              {computerLabs?.map((computerLab) => (
                <LabsCard
                  key={computerLab.id}
                  labName={computerLab.lab_name}
                  status={
                    computerLab.todayReservation?.status === "reserved" ||
                    computerLab.todayReservation?.status === "in_use"
                      ? computerLab.todayReservation.status
                      : "available"
                  }
                />
              ))}
            </ScrollView>
          </View>
        </View>

      </View>
    </SafeAreaProvider>
  );
}