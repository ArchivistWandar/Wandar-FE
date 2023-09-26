import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import Land from "../screens/Land";
import Archive from "../screens/Archive";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";

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
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Land" ? (
        <Stack.Screen
          name={"Land"}
          component={Land}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxHeight: 40, maxWidth: 200 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Archive" ? (
        <Stack.Screen name={"Archive"} component={Archive} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Land" component={Land} />
      {/* <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} /> */}
    </Stack.Navigator>
  );
};

export default SharedStackNav;
