import React, {useState, useEffect} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import ActorCategoriesScreen from '../../screens/actor-categories-screen/actor-categories-screen';

export type ActorRegistrationStackParamList = {
  ActorCategories: undefined;
  Farmers: undefined;
  ActorDashboard: {
    actorId: string;
  };
  InstitutionDashboard: {
    institutionId: string;
  };
  CoopDashboard: {
    coopId: string;
  };
  ActorFormDataPreview: undefined;
  InstitutionFormDataPreview: undefined;
  CoopFormDataPreview: undefined;
  FarmerForm1: undefined;

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

const ActorRegistrationStack =
  createNativeStackNavigator<ActorRegistrationStackParamList>();

export default function ActorRegistrationStackComponent({
  route,
  navigation,
}: any) {
  return (
    <ActorRegistrationStack.Navigator
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
      initialRouteName={'ActorCategories'}>
      <ActorRegistrationStack.Screen
        name="ActorCategories"
        component={ActorCategoriesScreen}
      />
    </ActorRegistrationStack.Navigator>
  );
}
