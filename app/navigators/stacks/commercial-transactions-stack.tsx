import React, {useState, useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import CommercialTransactionsScreen from '../../screens/commercial-transactions-screen/commercial-transactions-screen';


export type CommercialTransactionsStackParamList = {
  CommercialTransactions: undefined;

  //   FarmlandForm1: undefined;
  //   FarmlandAreaAudit: undefined;
  //   Geolocation: undefined;
  //   Membership: undefined;
  //   GroupRepresentative: undefined;
  //   GroupMembers: undefined;
  //   FarmerGroups: undefined;
  //   Camera: undefined;
  //   UserStat: undefined;
  //   FarmersListLayout: undefined;
  //   FarmersSearch: undefined;
};

const CommercialTransactionsStack =
  createNativeStackNavigator<CommercialTransactionsStackParamList>();

export default function CommercialTransactionsStackComponent({
  route,
  navigation,
}: any) {
  return (
    <CommercialTransactionsStack.Navigator
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
        title: 'CommercialTransactionsStack',
      }}
      initialRouteName={'CommercialTransactions'}>
      <CommercialTransactionsStack.Screen
        name="CommercialTransactions"
        component={CommercialTransactionsScreen}
      />
    </CommercialTransactionsStack.Navigator>
  );
}
