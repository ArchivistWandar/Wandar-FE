import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import { View, TouchableOpacity } from "react-native";
import useMe from "../hooks/useMe";
import { colors } from "../colors";
import UploadPopup from "../components/nav/UploadPopup";

const Tabs = createBottomTabNavigator();

export default function TabsNav({ navigation }) {
  const { data } = useMe();
  const [isUploadPopupVisible, setUploadPopupVisible] = useState(false);

  const toggleUploadPopup = () => {
    setUploadPopupVisible(!isUploadPopupVisible);
  };

  const handleSelectUpload = () => {
    toggleUploadPopup();
    // Navigate to the Upload Post screen
    navigation.navigate("UploadPostNav"); // Change "UploadPost" to the actual screen name
  };

  const handleSelectRecord = () => {
    toggleUploadPopup();
    // Navigate to the Upload Record screen
    navigation.navigate("UploadRecordNav"); // Change "UploadRecord" to the actual screen name
  };

  return (
    <View style={{ flex: 1 }}>
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
          {() => <SharedStackNav screenName="LandNav" />}
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
          component={TouchableOpacity} // Add the component property
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon
                color={color}
                focused={focused}
                iconName={"add-circle"}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleUploadPopup();
            },
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
          {() => <SharedStackNav screenName="NotificationsNav" />}
        </Tabs.Screen>
        <Tabs.Screen
          name="TabMyPage"
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon color={color} focused={focused} iconName={"person"} />
            ),
          }}
        >
          {() => <SharedStackNav screenName="MyPageNav" />}
        </Tabs.Screen>
      </Tabs.Navigator>
      <UploadPopup
        isVisible={isUploadPopupVisible}
        onClose={toggleUploadPopup}
        onSelectUpload={handleSelectUpload}
        onSelectRecord={handleSelectRecord}
        navigation={navigation} // Pass the navigation prop
      />
    </View>
  );
}
