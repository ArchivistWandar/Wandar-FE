import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: colors.backgroundColor,
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="ChooseAPhoto"
              options={{ title: "Choose a photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UploadNav;
