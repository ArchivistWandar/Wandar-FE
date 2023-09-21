import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColor};
  padding: 0px 20px;
`;

const ContentContainer = styled.View`
  flex: 1; /* Fill available vertical space */
  justify-content: center; /* Center content vertically */
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      <Container>
        <ContentContainer>
          <KeyboardAvoidingView
            style={{
              width: "100%",
            }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
          >
            {children}
          </KeyboardAvoidingView>
        </ContentContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
