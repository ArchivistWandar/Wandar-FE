import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../colors";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import SelectRPhotos from "../screens/UploadRecord/SelectRPhotos";
import PreviewRecord from "../screens/UploadRecord/PreviewRecord";

const EditableHeaderTitle = ({ initialTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  return isEditing ? (
    <TextInput
      value={title}
      onChangeText={setTitle}
      onEndEditing={() => {
        if (title.trim() === "") {
          setTitle(initialTitle);
        }
        setIsEditing(false);
      }}
      autoFocus
      style={{ color: "white", fontFamily: "JostSemiBold", fontSize: 15 }}
    />
  ) : (
    <TouchableOpacity
      onPress={() => setIsEditing(true)}
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <Text
        style={{ color: "white", fontFamily: "JostSemiBold", fontSize: 15 }}
      >
        {title}
      </Text>
      <Ionicons name="pencil" size={18} color={"white"} />
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();

const UploadRecordNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255, 255, 255, 0.2)",
          backgroundColor: "transparent", // 배경색을 투명하게 설정
        },
        headerTransparent: true, // 헤더의 배경을 투명하게 설정
        headerBackground: () => (
          // 블러 처리된 배경을 설정
          <BlurView
            tint="dark"
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerTitleStyle: {
          fontFamily: "JostSemiBold",
          fontSize: 15,
        },
      }}
    >
      <Stack.Screen
        name="SelectRPhotos"
        options={{
          headerShown: false,
        }}
        component={SelectRPhotos}
      />

      <Stack.Screen
        name="PreviewRecord"
        options={{
          headerTitle: () => <EditableHeaderTitle initialTitle="New record" />,
        }}
        component={PreviewRecord}
      />
      {/* <Stack.Screen
        name="DecoRecord"
        options={{
          headerTitle: "New record",
        }}
        component={DecoRecord}
      /> */}
    </Stack.Navigator>
  );
};

export default UploadRecordNav;
