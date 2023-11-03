import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../colors";
import UploadRecord from "../screens/UploadRecord/UploadRecord";

const Stack = createStackNavigator();

const UploadRecordNav = ({ route }) => {
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
        name="UploadRecord"
        options={{
          headerTitle: "New record",
        }}
        initialParams={{ route: result }}
        component={UploadRecord}
      />
    </Stack.Navigator>
  );
};

export default UploadRecordNav;
