import './global.css'
import Realm from "realm";
import React from 'react'
import Providers from './app/providers/providers'
import BottomTabsNavigator from './app/navigators/tabs/bottom-tabs-navigator'

export const realm = new Realm();

export default function App() {
  return (
    <Providers>
      <BottomTabsNavigator />
    </Providers>
  )
}