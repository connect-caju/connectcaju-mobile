import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { useColorScheme } from "nativewind";
import { NavigationContainer } from "@react-navigation/native";
import ActorRegistrationStackComponent from "../stacks/actor-registration-stack";


const Tabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
//   const user = useUser();
//   const customUserData = user?.customData;
//   const { colorScheme } = useColorScheme();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="ActorRegistrationStack"
        // shifting={true}
        // labeled={false}
        screenOptions={() => ({
          headerShown: false,
          TabsBarStyle: {
            marginTop: 0,
          },
          TabsBarIconStyle: {},
        //   TabsBarActiveBackgroundColor:
        //     colorScheme === "dark" ? "#000000" : "#ffffff",
        //   TabsBarInactiveBackgroundColor:
        //     colorScheme === "dark" ? "#000000" : "#ffffff",
          TabsBarAllowFontScaling: true,
          TabsBarShowLabel: true,
          TabsBarHideOnKeyboard: true,
        //   TabsBarLabelStyle: {
        //     color: colorScheme === "dark" ? "#ffffff" : COLORS.grey,
        //     fontSize: 12,
        //     fontWeight: "bold",
        //   },
        })}
      >
       
        <Tabs.Screen
          name="ActorCategoriesStack"
          component={ActorRegistrationStackComponent}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
