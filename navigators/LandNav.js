import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Land from "../screens/Land";
import FriendSelect from "../screens/FriendSelect";

const Stack = createStackNavigator();

const LandNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Land"
        options={{
          headerShown: false,
        }}
        component={Land}
      />
      <Stack.Screen
        name="FriendSelect"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={FriendSelect}
      />
    </Stack.Navigator>
  );
};

export default LandNav;
