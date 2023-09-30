import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundColor};
`;

export default function ProfileEditContainer({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const keyboardBehavior = Platform.OS === "ios" ? "padding" : null;
  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : -2;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={keyboardBehavior}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={{ flex: 1 }}>{children}</View>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
