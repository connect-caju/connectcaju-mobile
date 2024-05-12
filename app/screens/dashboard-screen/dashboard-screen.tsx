import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';

export default function DashboardScreen() {
    const { colorScheme } = useColorScheme();
  return (
    <View>
      <Text>DashboardScreen</Text>
      <StatusBar barStyle="dark-content" backgroundColor={colorScheme === "dark" ? "black" : "white"} />
    </View>
  )
}