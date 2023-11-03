import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import * as ImagePicker from "expo-image-picker";

const UploadPopup = ({ isVisible, onClose, navigation }) => {
  const onSelectUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 4,
    });

    if (!result.canceled) {
      navigation.navigate("UploadPostNav", { result: result });
    }

    // Close the modal after selecting an option
    onClose();
  };

  const onSelectRecord = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 6,
    });

    if (!result2.canceled) {
      navigation.navigate("UploadRecordNav", { result: result2 });
    }

    // Close the modal after selecting an option
    onClose();
  };

  const popupStyle = {
    position: "absolute",
    bottom: "10%",
    left: "31%",
    backgroundColor: "white",
    width: "38%",
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
