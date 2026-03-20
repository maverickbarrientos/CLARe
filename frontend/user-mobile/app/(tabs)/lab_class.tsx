import { Text, View, ScrollView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScreenTitle } from '@/components/ScreenTitle'
import { useLabClass } from '@/hooks/useLabClass'
import { ClassCard } from '@/components/ClassCard'
import { Modal } from '@/components/Modal'
import { useAuth } from "@/hooks/useAuth";

const LabClass = () => {

  const { labClass, error, loading } = useLabClass();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const { user } = useAuth();
  const firstName = user?.users_information?.first_name;
  const lastName = user?.users_information?.last_name;
  const fullName = `${firstName} ${lastName}`;

  console.log(labClass)

  return (
    <SafeAreaProvider>
      <ScrollView className="flex-1 bg-black p-5">

        <Modal visible={loading} type="loading" title="Loading Classes" subTitle="Please wait..." />
        <Modal visible={!!error} type="error" title="Something went wrong" subTitle="Failed to load classes." />

        <ScreenTitle pageTitle='LAB CLASS' userName={fullName} />

        <View>
          <View className='my-2'>
            <Text className="text-white font-heading text-xl">Class Today</Text>
            <Text className="font-subheading text-white text-lg">{currentDay}</Text>
          </View>

          {labClass?.length > 0 ?
            labClass.map((labClass) => (
              <ClassCard
                key={labClass.id}
                section={labClass.section}
                subject={labClass.subject}
                teacher={labClass.teacher}
                department={labClass.department}
                start_time={labClass.start_time}
                end_time={labClass.end_time}
                computer_labs={labClass.computer_labs}
                classId={labClass.id}
              />
            )) :
            !loading && <Text className="text-white font-sans">No class today</Text>
          }
        </View>

      </ScrollView>
    </SafeAreaProvider>
  )
}

export default LabClass