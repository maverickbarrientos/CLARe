import { Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabIcon } from '@/components/TabIcon'
import { Icons } from "@/constants/icons";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: "#111111",
          margin: 0,
          paddingTop: 20,
          height: 120,
          position: 'absolute',
          borderTopColor: "black"
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{ 
          title: "HOME",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={Icons.home} title="HOME" />
          ),
         }}
      />

      <Tabs.Screen
        name='reservations'
        options={{ 
          title: "RESERVATIONS",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={Icons.reservation} title="RESERVATIONS" />
          ),
         }}
      />

      <Tabs.Screen
        name='computer_labs'
        options={{
          title: "COMPUTER LABS",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={Icons.computer_labs} title="COMPUTER LABS" />
          ),
         }}
      />

      <Tabs.Screen
        name='lab_class'
        options={{
          title: "LAB CLASS",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={Icons.class} title="LAB CLASS" />
          ),
         }}
      />

    </Tabs>
  )
}

export default _Layout
