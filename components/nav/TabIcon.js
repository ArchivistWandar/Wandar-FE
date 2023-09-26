import React from "react";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ iconName, color, focused }) => {
  return (
    <Ionicons
      name={focused ? `${iconName}` : `${iconName}-outline`}
      color={color}
      size={24}
    />
  );
};

export default TabIcon;
