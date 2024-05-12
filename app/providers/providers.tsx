
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  )
}