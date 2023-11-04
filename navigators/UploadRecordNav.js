import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../colors";
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

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
        // headerBackground: () =>
        //   // 블러 처리된 배경을 설정
        //   Platform.OS === "ios" ? (
        //     <BlurView
        //       tint="dark"
        //       intensity={50}
        //       style={StyleSheet.absoluteFill}
        //     />
        //   ) : (
        //     <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
        //   ),
        // headerTitleStyle: {
        //   fontFamily: "JostSemiBold",
        //   fontSize: 15,
        // },
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
      {/* <Stack.Screen
        name="DecoRecord"
        options={{
          headerTitle: "New record",
        }}
        component={DecoRecord}
      /> */}
    </Stack.Navigator>
  );
};

export default UploadRecordNav;
