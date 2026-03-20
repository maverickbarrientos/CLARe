import { View, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScreenTitle } from '@/components/ScreenTitle'
import { LabsPreviewCard } from '@/components/LabsPreviewCard'
import { Modal } from '@/components/Modal'
import { useComputerLabs } from '@/hooks/useComputerLabs'
import { useAuth } from "@/hooks/useAuth";

const ComputerLabs = () => {

  const { computerLabs, error, loading } = useComputerLabs();
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black p-5">

        <Modal visible={loading} type="loading" title="Loading Computer Labs" subTitle="Please wait..." />
        <Modal visible={!!error} type="error" title="Something went wrong" subTitle="Failed to load computer labs." />

        <ScreenTitle pageTitle="COMPUTER LABS" userName={fullName} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {computerLabs?.map((computerLab) => (
              <LabsPreviewCard
                key={computerLab.id}
                labName={computerLab.lab_name}
                capacity={computerLab.capacity}
                location={computerLab.location}
                labID={computerLab.id}
                status={
                  computerLab.todayReservation?.status === "reserved" ||
                  computerLab.todayReservation?.status === "in_use"
                    ? computerLab.todayReservation.status
                    : "available"
                }
              />
            ))}
          </View>
        </ScrollView>

      </View>
    </SafeAreaProvider>
  )
}

export default ComputerLabs