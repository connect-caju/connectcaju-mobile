import React, {useState, useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import DashboardScreen from '../../screens/dashboard-screen/dashboard-screen';

export type DashboardStackParamList = {
  Dashboard: undefined


};

const DashboardStack =
  createNativeStackNavigator<DashboardStackParamList>();

export default function DashboardStackComponent({
  route,
  navigation,
}: any) {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#005000',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        title: 'ActorRegistrationStack',
      }}
      initialRouteName={'Dashboard'}>
      <DashboardStack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </DashboardStack.Navigator>
  );
}
