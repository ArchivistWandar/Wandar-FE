import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import {
  removeWhitespace,
  validateUsername,
} from "../../components/auth/Utils";
import {
  AuthButtonContainer,
  AuthErrorMessage,
  AuthTextBox,
  AuthTextInfo,
  AuthTextInput,
  AuthTitle,
} from "../../components/auth/AuthShared";
import { View } from "react-native";
import { Container } from "../../components/Shared";

const SetUsername = ({ route, navigation }) => {
  const { email, password } = route.params;

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const inputRef = useRef();
  const goToProfile = () =>
    navigation.navigate("SetProfile", {
      email: email,
      password: password,
      username: username.replace("@", ""),
    });

  const _handleUsernameChange = (username) => {
    // Remove whitespace and ensure "@" is at the beginning
    let changedUsername = removeWhitespace(username);
    if (!changedUsername.startsWith("@")) {
      changedUsername = "@" + changedUsername;
    }

    setUsername(changedUsername);
    setErrorMessage(
      validateUsername(changedUsername)
        ? ""
        : "Your username is already taken. Please try another."
    );
  };

  useEffect(() => {
    setDisabled(!(username && !errorMessage));
  }, [username, errorMessage]);

  return (
    <Container>
      <AuthTitle>Add your username</AuthTitle>
      <AuthLayout>
        <AuthTextBox disabled={errorMessage}>
          <View>
            <AuthTextInfo>Username</AuthTextInfo>
            <AuthTextInput
              placeholder="@wandar"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              returnKeyType="next"
              autoCapitalize={"none"}
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
              value={username}
              onChangeText={_handleUsernameChange}
            />
          </View>
        </AuthTextBox>
        <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        <AuthButtonContainer>
          <AuthButton
            text="Continue"
            disabled={disabled}
            onPress={goToProfile}
            isYellow={false}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default SetUsername;
