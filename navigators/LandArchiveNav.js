import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import ArchiveRecords from "../screens/ArchiveRecords";
import ArchivePosts from "../screens/ArchivePosts";
import { colors } from "../colors";
import TabIcon from "../components/nav/TabIcon";
import MyPhotos from "../screens/MyPage/MyPhotos";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const LandArchiveNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          paddingTop: "30%",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="Posts"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"list"} />
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
              name="ArchivePosts"
              component={ArchivePosts}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Gallery"
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

export default LandArchiveNav;
