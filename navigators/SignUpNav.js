import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SetEmail from "../screens/SignUp/SetEmail";
import SetPassword from "../screens/SignUp/SetPassword";
import SetUsername from "../screens/SignUp/SetUsername";

const Stack = createStackNavigator();

const SignUpNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="SetEmail"
        component={SetEmail}
        options={{
          headerTitle: "1 of 3",
          headerTitleStyle: { fontFamily: "JostMedium" },
        }}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          headerTitle: "2 of 3",
          headerTitleStyle: { fontFamily: "JostMedium" },
        }}
      />
      <Stack.Screen
        name="SetUsername"
        component={SetUsername}
        options={{
          headerTitle: "3 of 3",
          headerTitleStyle: { fontFamily: "JostMedium" },
        }}
      />
    </Stack.Navigator>
  );
};

export default SignUpNav;
