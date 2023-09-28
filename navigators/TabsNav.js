import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import { View } from "react-native";
import useMe from "../hooks/useMe";
import { colors } from "../colors";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          borderTopColor: "rgba(255,255,255,0.5)",
        },
        tabBarActiveTintColor: "#6B78B7",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="TabLand"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              color={color}
              focused={focused}
              iconName={"home"}
              location={true}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Land" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabArchive"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"albums"} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Archive" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabUpload"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"add-circle"} />
          ),
        }}
      />
      <Tabs.Screen
        name="TabNotifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              color={color}
              focused={focused}
              iconName={"notifications"}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="TabMe"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} focused={focused} iconName={"person"} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
