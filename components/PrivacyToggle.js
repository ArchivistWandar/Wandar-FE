import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../colors";
import { Ionicons } from "@expo/vector-icons";

const PrivacyToggle = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 30,
          width: 70,
          backgroundColor: colors.backgroundColor,
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor:
              getSelectionMode == 1 ? selectionColor : colors.backgroundColor,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="people"
            size={14}
            color={
              getSelectionMode == 1 ? colors.backgroundColor : selectionColor
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor:
              getSelectionMode == 2 ? selectionColor : colors.backgroundColor,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="lock-closed"
            size={14}
            color={
              getSelectionMode == 2 ? colors.backgroundColor : selectionColor
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PrivacyToggle;
