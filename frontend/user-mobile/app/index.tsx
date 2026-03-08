import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaProvider>
      <View>
        <Text className='text-white'>index</Text>
      </View>
    </SafeAreaProvider>
  )
}

export default index