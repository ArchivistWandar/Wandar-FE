import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../colors";
import { Text, TouchableOpacity } from "react-native";

import SelectPhotos from "../screens/UploadPost/SelectPhotos";
import AddMemo from "../screens/UploadPost/AddMemo";
import ChooseLand from "../screens/UploadPost/ChooseLand";
import Preview from "../screens/UploadPost/Preview";
import UploadPopup from "../components/nav/UploadPopup";

const Stack = createStackNavigator();

const UploadPostNav = ({ route }) => {
  const { result } = route.params;
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
        name="AddMemo"
        options={({ navigation }) => ({
          headerTitle: "New post",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ChooseLand");
              }}
            >
              <Text
                style={{
                  color: "#FFEE74",
                  marginRight: 16,
                  fontFamily: "JostSemiBold",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          ),
        })}
        initialParams={{ route: result }}
        component={AddMemo}
      />
      <Stack.Screen
        name="ChooseLand"
        options={({ navigation }) => ({
          headerTitle: "New post",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Preview");
              }}
            >
              <Text
                style={{
                  color: "#FFEE74",
                  marginRight: 16,
                  fontFamily: "JostSemiBold",
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
          ),
        })}
        component={ChooseLand}
      />
      <Stack.Screen
        name="Preview"
        options={({ navigation }) => ({
          headerTitle: "New post",
          headerRight: () => (
            <TouchableOpacity>
              <Text
                style={{
                  color: "#FFEE74",
                  marginRight: 16,
                  fontFamily: "JostSemiBold",
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>
          ),
        })}
        component={Preview}
      />
    </Stack.Navigator>
  );
};

export default UploadPostNav;
