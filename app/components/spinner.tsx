
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";


export default function Spinner({
  loadingActivitiyIndicator,
  setLoadingActivityIndicator,
  backgroundColor,
  indicatorColor
}: any)  {

    const { colorScheme } = useColorScheme();




  return (
    <View
      className={`flex flex-1 justify-center items-center bg-white dark:bg-black`}
    >
      <ActivityIndicator
        size={"large"}
       />
    <StatusBar barStyle={"dark-content"} backgroundColor={ colorScheme === "dark" ? "black" : "white"} />
    </View>
  );
};


