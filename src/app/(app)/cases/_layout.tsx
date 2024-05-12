import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack screenOptions={{statusBarColor: "#fff", headerTitleAlign: 'center', headerShadowVisible: false}}>
      <Stack.Screen name="[id]" options={{headerTitle: ''}} />
      <Stack.Screen name="create" options={{presentation: 'modal', animation: 'slide_from_bottom', headerShown: false}} />
      <Stack.Screen name="add-offender" options={{presentation: 'transparentModal', headerShown: false}} />
    </Stack>
  )
}

export default Layout