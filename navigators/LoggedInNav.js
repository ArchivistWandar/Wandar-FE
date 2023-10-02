import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import { colors } from "../colors";
import UploadPost from "../screens/UploadPost";
import UploadRecord from "../screens/UploadRecord";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator screenOptions={{ mode: "modal" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="UploadPost"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
        }}
        component={UploadPost}
      />
      <Stack.Screen
        name="UploadRecord"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
        }}
        component={UploadRecord}
      />
    </Stack.Navigator>
  );
}
