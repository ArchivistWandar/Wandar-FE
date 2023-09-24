import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SetEmail from "../screens/SignUp/SetEmail";
import SetPassword from "../screens/SignUp/SetPassword";
import SetUsername from "../screens/SignUp/SetUsername";
import SetProfile from "../screens/SignUp/SetProfile";

const Stack = createStackNavigator();

const SignUpNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="SetEmail" component={SetEmail} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="SetUsername" component={SetUsername} />
      <Stack.Screen name="SetProfile" component={SetProfile} />
    </Stack.Navigator>
  );
};

export default SignUpNav;
