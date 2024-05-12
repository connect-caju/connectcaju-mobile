import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import {NavigationContainer} from '@react-navigation/native';
import ActorRegistrationStackComponent from '../stacks/actor-registration-stack';
import CommercialTransactionsStackComponent from '../stacks/commercial-transactions-stack';
import UserProfileStackComponent from '../stacks/user-profile-stack';
import DashboardStackComponent from '../stacks/dashboard-stack';

const Tabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  //   const user = useUser();
  //   const customUserData = user?.customData;
  const {colorScheme} = useColorScheme();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="DashboardStack"
        // shifting={true}
        // labeled={false}
        screenOptions={() => ({
          headerShown: false,
          TabsBarStyle: {
            marginTop: 0,
          },
          TabsBarIconStyle: {},
          TabsBarActiveBackgroundColor:
            colorScheme === 'dark' ? '#000000' : '#ffffff',
          TabsBarInactiveBackgroundColor:
            colorScheme === 'dark' ? '#000000' : '#ffffff',
          TabsBarAllowFontScaling: true,
          TabsBarShowLabel: true,
          TabsBarHideOnKeyboard: true,
            TabsBarLabelStyle: {
              color: colorScheme === "dark" ? "#ffffff" : "#000000",
              fontSize: 12,
              fontWeight: "bold",
            },
        })}>
        <Tabs.Screen
          name="DashboardStack"
          component={DashboardStackComponent}
        />
        <Tabs.Screen
          name="ActorCategoriesStack"
          component={ActorRegistrationStackComponent}
        />
        <Tabs.Screen
          name="CommercialTransactionsStack"
          component={CommercialTransactionsStackComponent}
        />
        <Tabs.Screen
          name="UserProfilesStack"
          component={UserProfileStackComponent}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
