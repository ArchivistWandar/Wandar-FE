import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Land from "../screens/Land";
import FriendSelect from "../screens/Airplane/FriendSelect";
import LandDetail from "../screens/LandDetail";
import LandArchiveNav from "./LandArchiveNav";
import LandAdd from "../screens/LandAdd";
import FriendDelete from "../screens/Airplane/FriendDelete";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

const LandNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Land"
        options={{
          headerShown: false,
        }}
        component={Land}
      />
      <Stack.Screen
        name="FriendSelect"
        options={({ navigation }) => ({
          headerTransparent: true,
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FriendDelete");
              }}
              style={{ marginRight: "6%" }}
            >
              <Ionicons name="ellipsis-vertical" color={"white"} size={20} />
            </TouchableOpacity>
          ),
        })}
        component={FriendSelect}
      />
      <Stack.Screen
        name="FriendDelete"
        options={{
          headerTransparent: true,
          headerTitle: "Friends",
          headerTitleStyle: { fontFamily: "JostSemiBold", fontSize: 16 },
        }}
        component={FriendDelete}
      />
      <Stack.Screen
        name="LandAdd"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={LandAdd}
      />
      <Stack.Screen
        name="LandDetail"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={LandDetail}
      />
      <Stack.Screen
        name="LandArchiveNav"
        options={{ headerTransparent: true, headerTitle: "" }}
        component={LandArchiveNav}
      />
    </Stack.Navigator>
  );
};

export default LandNav;
