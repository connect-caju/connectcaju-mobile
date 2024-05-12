import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme} from 'nativewind';
import {NavigationContainer} from '@react-navigation/native';
import ActorRegistrationStackComponent from '../stacks/actor-registration-stack';
import CommercialTransactionsStackComponent from '../stacks/commercial-transactions-stack';
import UserProfileStackComponent from '../stacks/user-profile-stack';
import DashboardStackComponent from '../stacks/dashboard-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Icon,
} from '@gluestack-ui/themed';
import {User} from 'lucide-react-native';

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
            color: colorScheme === 'dark' ? '#ffffff' : '#000000',
            fontSize: 12,
            fontWeight: 'bold',
          },
        })}>
        <Tabs.Screen
          options={({route}) => ({
            tabBarLabel: 'Painel',
            tabBarLabelStyle: {color: colorScheme === 'dark' ? '#ffffff' : '#000000'},
            tabBarIcon: tabInfo =>
              tabInfo.focused ? (
                <MaterialCommunityIcons
                  name="view-grid"
                  size={30}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ) : (
                <MaterialCommunityIcons
                  name="view-grid-outline"
                  size={30}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ),
          })}
          name="DashboardStack"
          component={DashboardStackComponent}
        />
        <Tabs.Screen
          options={({route}) => ({
            tabBarLabel: 'Registo',
            tabBarLabelStyle: {color: colorScheme === 'dark' ? '#ffffff' : '#000000'},
            tabBarIcon: tabInfo =>
              tabInfo.focused ? (
                <MaterialIcons
                  name="add-box"
                  size={35}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ) : (
                <Octicons
                  name="diff-added"
                  size={30}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ),
          })}
          name="ActorCategoriesStack"
          component={ActorRegistrationStackComponent}
        />
        <Tabs.Screen
          options={({route}) => ({
            tabBarLabel: 'Transações',
            tabBarLabelStyle: {color: colorScheme === 'dark' ? '#ffffff' : '#000000'},
            tabBarIcon: tabInfo =>
              tabInfo.focused ? (
                <MaterialIcons
                  name="track-changes"
                  size={30}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ) : (
                <Feather
                  name="dollar-sign"
                  size={30}
                  color={
                    tabInfo.focused
                      ? '#008000'
                      : colorScheme === 'dark'
                      ? '#ffffff'
                      : '#000000'
                  }
                />
              ),
          })}
          name="CommercialTransactionsStack"
          component={CommercialTransactionsStackComponent}
        />
        <Tabs.Screen
          options={({route}) => ({
            tabBarLabel: 'Você',
            tabBarLabelStyle: {color: colorScheme === 'dark' ? '#ffffff' : '#000000'},
            tabBarIcon: tabInfo => (
              <Avatar
                size="sm"
                bgColor={
                  colorScheme === 'dark'
                    ? '#ffffff'
                    : tabInfo.focused
                    ? '#008000'
                    : '#ffffff'
                }
                borderRadius="$full" borderWidth={2} borderColor={tabInfo.focused ? "#008000" : "#000000"}>
                <Icon
                  as={User}
                  size={'md'}
                  color={colorScheme === 'dark' ? '#ffffff' : tabInfo.focused ? '#ffffff' : '#000000'}
                />
                <AvatarImage />
              </Avatar>
            ),
          })}
          name="UserProfilesStack"
          component={UserProfileStackComponent}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
