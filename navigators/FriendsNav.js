import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import FriendsTab from "../screens/FriendsTab";
import BrowseTab from "../screens/BrowseTab";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const FriendsNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "JostSemiBold",
          textTransform: "capitalize",
          fontSize: 15,
        },
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          paddingTop: "15%",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen name="Friends">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
            }}
          >
            <Stack.Screen
              name="FriendsTab"
              component={FriendsTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Browse">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
            }}
          >
            <Stack.Screen
              name="BrowseTab"
              component={BrowseTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default FriendsNav;
