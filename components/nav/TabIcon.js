import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Location from "../../assets/location";
import LocationOutline from "../../assets/location-outline";

const TabIcon = ({ iconName, color, focused, location }) => {
  return !location ? (
    <Ionicons
      name={focused ? `${iconName}` : `${iconName}-outline`}
      color={color}
      size={24}
    />
  ) : focused ? (
    <Location />
  ) : (
    <LocationOutline />
  );
};

export default TabIcon;
