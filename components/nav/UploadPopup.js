import React from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons

const UploadPopup = ({
  isVisible,
  onClose,
  onSelectUpload,
  onSelectRecord,
}) => {
  const popupStyle = {
    position: "absolute",
    bottom: "10%", // Adjust the distance from the bottom as needed
    left: "31%", // Adjust for the popup width
    backgroundColor: "white",
    width: "38%", // Adjust the width as needed
    alignSelf: "flex-end",
    padding: 16,
    borderRadius: 20,
    elevation: 5,
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View style={popupStyle}>
            <Text
              style={{
                fontSize: 13,
                marginBottom: 14,
                textAlign: "center",
                fontFamily: "JostMedium",
              }}
            >
              Upload new
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={onSelectUpload}
                style={{ alignItems: "center" }}
              >
                <Ionicons name="images" size={30} color="black" />
                <Text style={{ fontSize: 12, fontFamily: "JostRegular" }}>
                  Post
                </Text>
              </TouchableOpacity>
              <View
                style={{ width: 0.5, height: 48, backgroundColor: "black" }}
              />
              <TouchableOpacity
                onPress={onSelectRecord}
                style={{ alignItems: "center" }}
              >
                <Ionicons name="analytics" size={30} color="black" />
                <Text style={{ fontSize: 12, fontFamily: "JostRegular" }}>
                  Record
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UploadPopup;
