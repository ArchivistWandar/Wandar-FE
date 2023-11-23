import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../colors";
import Notifications from "../screens/Notifications";
import FollowRequests from "../screens/FollowRequests";
import PostDetail from "../screens/PostDetail";
import RecordDetail from "../screens/RecordDetail";

const Stack = createStackNavigator();

const NotificationsNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: colors.backgroundColor,
        },
        headerTitleStyle: {
          fontFamily: "JostSemiBold",
          fontSize: 15,
        },
      }}
    >
      <Stack.Screen
        name="Notifications"
        options={{
          headerTitle: "Notifications",
        }}
        component={Notifications}
      />
      <Stack.Screen
        name="FollowRequests"
        options={{
          headerTitle: "Follow requests",
        }}
        component={FollowRequests}
      />
      <Stack.Screen
        name="PostDetail"
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
        component={PostDetail}
      />
      <Stack.Screen
        name="RecordDetail"
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
        component={RecordDetail}
      />
    </Stack.Navigator>
  );
};

export default NotificationsNav;
