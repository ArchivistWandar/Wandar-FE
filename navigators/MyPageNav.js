import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import TabIcon from "../components/nav/TabIcon";
import MyTimeline from "../screens/MyPage/MyTimeline";
import MyPhotos from "../screens/MyPage/MyPhotos";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MyPageNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          paddingTop: "5%",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="Timeline"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"time"} />
          ),
          tabBarShowLabel: false,
        }}
      >
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
              name="MyTimeline"
              component={MyTimeline}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Photos"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"apps"} />
          ),
          tabBarShowLabel: false,
        }}
      >
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
              name="MyPhotos"
              component={MyPhotos}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MyPageNav;
