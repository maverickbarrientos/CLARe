import { Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ScreenTitle } from '@/components/ScreenTitle'
import { LabsPreviewCard } from '@/components/LabsPreviewCard'

const ComputerLabs = () => {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-black p-5">
        <ScreenTitle pageTitle="Computer Labs" />

        <View>
          <LabsPreviewCard labName='Computer Lab 88' capacity='67'
          location='dalom balay' status='pending' key={1} />

          <LabsPreviewCard labName='Computer Lab 88' capacity='67'
          location='dalom balay' status='pending' key={2} />
        </View>

      </View>
    </SafeAreaProvider>
  )
}

export default ComputerLabs