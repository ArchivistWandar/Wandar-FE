// SlideUpModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const SlideUpModal = ({ visible, onClose }) => {
  const [animation] = useState(new Animated.Value(0));

  if (visible) {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const modalY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: modalY }],
            },
          ]}
        >
          {/* 모달 내용 */}
          <Text>Here is the modal content!</Text>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... 스타일 정의
});

export default SlideUpModal;
