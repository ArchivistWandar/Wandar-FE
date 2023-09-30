import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Notifications from "../screens/Notifications";
import { colors } from "../colors";
import ArchiveNav from "./ArchiveNav";
import MyPageNav from "./MyPageNav";
import LandNav from "./LandNav";

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
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
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
