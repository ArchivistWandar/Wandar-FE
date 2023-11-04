import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SelectRPhotos from "../screens/UploadRecord/SelectRPhotos";
import PreviewRecord from "../screens/UploadRecord/PreviewRecord";

const Stack = createStackNavigator();

const UploadRecordNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerTransparent: true, // 헤더의 배경을 투명하게 설정
      }}
    >
      <Stack.Screen
        name="SelectRPhotos"
        options={{
          headerShown: false,
        }}
        component={SelectRPhotos}
      />

      <Stack.Screen name="PreviewRecord" component={PreviewRecord} />
    </Stack.Navigator>
  );
};

export default UploadRecordNav;
