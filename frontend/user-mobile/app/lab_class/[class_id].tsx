import { Text, View } from 'react-native'
import { useClass } from '@/hooks/useClass'
import { ScreenTitle } from '@/components/ScreenTitle'
import { DetailsPanel } from '@/components/DetailsPanel'
import { Modal } from '@/components/Modal'

const ViewClass = () => {

  const { labClass, error, loading } = useClass()
  const capitalize = (str?: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  console.log("CLASS", labClass);

  return (
    <View className='flex-1 bg-black p-5'>

      <Modal visible={loading} type="loading" title="Loading Class" subTitle="Please wait..." />
      <Modal visible={!!error} type="error" title="Something went wrong" subTitle="Failed to load class details." />

      {labClass && (
        <>
          <ScreenTitle pageTitle={`${labClass.subject} ${labClass.section}`} />

          <View className='my-2'>
            <Text className="color-white font-subheading text-2xl">Class Information</Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
              <View style={{ width: '50%', paddingVertical: 8, paddingRight: 12 }}>
                <DetailsPanel title="Day" content={capitalize(labClass.day)} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8 }}>
                <DetailsPanel title="Teacher" content={labClass.teacher} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8, paddingRight: 12 }}>
                <DetailsPanel title="Section" content={labClass.section} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8 }}>
                <DetailsPanel title="Department" content={labClass.department} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8, paddingRight: 12 }}>
                <DetailsPanel title="Start" content={labClass.start_time} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8 }}>
                <DetailsPanel title="End" content={labClass.end_time} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8, paddingRight: 12 }}>
                <DetailsPanel title="Computer Lab" content={labClass.computer_labs.lab_name} />
              </View>
              <View style={{ width: '50%', paddingVertical: 8 }}>
                <DetailsPanel title="Location" content={labClass.computer_labs.location} />
              </View>
            </View>
          </View>
        </>
      )}

    </View>
  )
}

export default ViewClass