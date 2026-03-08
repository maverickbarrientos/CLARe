import { Text, View, ScrollView } from "react-native";
import { ScreenTitle } from "@/components/ScreenTitle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ReservationCard } from "@/components/ReservationCard";
import { LabsCard } from "@/components/LabsCard";

export default function Home() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black p-5">
        <ScreenTitle pageTitle="Home" />

        <View>
          <View>
            <Text className="color-white font-subheading text-3xl">Your Reservations</Text>
            <ReservationCard computerLab="Computer Lab 3" name="Maverick Jade Barrientos" department="CITE" time="February 4, 2025" status="pending"/>
          </View>

          <View>
            <Text className="color-white font-subheading text-3xl">Computer Labs</Text>  
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="my-5"
            >
              <LabsCard labName="Computer Lab 3" status="pending" />
              <LabsCard labName="Computer Lab 4" status="reserved" />
              <LabsCard labName="Computer Lab 5" status="pending" />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}