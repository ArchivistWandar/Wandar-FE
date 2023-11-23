import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Notifications from "../screens/Notifications";
import { colors } from "../colors";
import ArchiveNav from "./ArchiveNav";
import MyPageNav from "./MyPageNav";
import LandNav from "./LandNav";
import NotificationsNav from "./NotificationsNav";

const Stack = createStackNavigator();

const SharedStackNav = ({ screenName }) => {
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
      {screenName === "LandNav" ? (
        <Stack.Screen
          name={"LandNav"}
          component={LandNav}
          options={{
            headerShown: false,
          }}
        />
      ) : null}
      {screenName === "Archive" ? (
        <Stack.Screen
          name="ArchiveNav"
          options={{ headerShown: false }}
          component={ArchiveNav}
        />
      ) : null}
      {screenName === "NotificationsNav" ? (
        <Stack.Screen
          name={"NotificationsNav"}
          options={{ headerShown: false }}
          component={NotificationsNav}
        />
      ) : null}
      {screenName === "MyPageNav" ? (
        <Stack.Screen
          name={"MyPageNav"}
          component={MyPageNav}
          options={{ headerShown: false }}
        />
      ) : null}
      {/* <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} /> */}
    </Stack.Navigator>
  );
};

export default SharedStackNav;
