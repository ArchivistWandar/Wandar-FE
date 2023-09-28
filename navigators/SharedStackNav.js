import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Land from "../screens/Land";
import Archive from "../screens/ArchivePosts";
import Notifications from "../screens/Notifications";
import { colors } from "../colors";
import MyPage from "../screens/MyPage";
import ArchiveNav from "./ArchiveNav";

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
      {screenName === "Land" ? (
        <Stack.Screen
          name={"Land"}
          component={Land}
          options={{
            headerShown: false,
          }}
        />
      ) : null}
      {screenName === "Archive" ? (
        // <Stack.Screen
        //   name={"Archive"}
        //   component={Archive}
        //   options={{
        //     headerShown: false,
        //   }}
        // />
        <Stack.Screen
          name="ArchiveNav"
          options={{ headerShown: false }}
          component={ArchiveNav}
        />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "MyPage" ? (
        <Stack.Screen
          name={"MyPage"}
          component={MyPage}
          options={{ headerTitle: "My page" }}
        />
      ) : null}
      {/* <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} /> */}
    </Stack.Navigator>
  );
};

export default SharedStackNav;
