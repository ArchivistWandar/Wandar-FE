import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { colors } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const PrivacyToggle = ({ isPublic, onSelectSwitch, selectionColor }) => {
  const [active, setActive] = useState(isPublic ? 1 : 2);
  const translateX = useRef(new Animated.Value(isPublic ? 0 : 40)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: active === 1 ? 0 : 40,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [active]);

  const togglePrivacy = () => {
    const newValue = active === 1 ? 2 : 1;
    setActive(newValue);
    onSelectSwitch(newValue === 1);
  };

  return (
    <View
      style={{
        height: 30,
        width: 70,
        backgroundColor: colors.backgroundColor,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: selectionColor,
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePrivacy}
        style={{
          flex: 1,
          backgroundColor:
            active === 2 ? selectionColor : colors.backgroundColor,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="people"
          size={14}
          color={active === 2 ? colors.backgroundColor : selectionColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={togglePrivacy}
        style={{
          flex: 1,
          backgroundColor:
            active === 1 ? selectionColor : colors.backgroundColor,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="lock-closed"
          size={14}
          color={active === 1 ? colors.backgroundColor : selectionColor}
        />
      </TouchableOpacity>
    </View>
  );
};
export default PrivacyToggle;
