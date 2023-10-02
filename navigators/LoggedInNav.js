import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadPostNav from "./UploadPostNav";
import UploadRecordNav from "./UploadRecordNav";

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
        name="UploadPostNav"
        options={{ headerShown: false }}
        component={UploadPostNav}
      />
      <Stack.Screen
        name="UploadRecordNav"
        options={{ headerShown: false }}
        component={UploadRecordNav}
      />
    </Stack.Navigator>
  );
}
