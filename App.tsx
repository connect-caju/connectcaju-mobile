import './global.css'
import React from 'react'
import Providers from './app/providers/providers'
import BottomTabsNavigator from './app/navigators/tabs/bottom-tabs-navigator'

export default function App() {
  return (
    <Providers>
      <BottomTabsNavigator />
    </Providers>
  )
}