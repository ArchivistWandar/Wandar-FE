import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import {
  AuthButtonContainer,
  AuthErrorMessage,
  AuthTextBox,
  AuthTextInfo,
  AuthTextInput,
  AuthTitle,
} from "../../components/auth/AuthShared";
import AuthButton from "../../components/auth/AuthButton";
import { removeWhitespace } from "../../components/auth/Utils";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Container } from "../../components/Shared";

const SetPassword = ({ route, navigation }) => {
  const { email } = route.params;

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true); // Initially disabled

  const inputRef = useRef();

  useEffect(() => {
    setDisabled(!(password.length >= 8 && !errorMessage));
  }, [password, errorMessage]);

  const _handlePasswordChange = (password) => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
    setErrorMessage(
      changedPassword.length >= 8 ? "" : "Enter at least 8 characters."
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const goToUsername = () =>
    navigation.navigate("SetUsername", { email: email, password: password });

  return (
    <Container>
      <AuthTitle>Choose a password</AuthTitle>
      <AuthLayout>
        <AuthTextBox disabled={errorMessage}>
          <View>
            <AuthTextInfo>Password</AuthTextInfo>
            <AuthTextInput
              placeholder="At least 8 characters"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              secureTextEntry={!showPassword}
              autoCorrect={false}
              returnKeyType="next"
              autoCapitalize={"none"}
              ref={inputRef}
              onLayout={() => inputRef.current.focus()}
              value={password}
              onChangeText={_handlePasswordChange}
            />
          </View>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              color={"white"}
              size={24}
            />
          </TouchableOpacity>
        </AuthTextBox>
        <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        <AuthButtonContainer>
          <AuthButton
            text="Continue"
            disabled={disabled} // Disable the button if conditions are not met
            onPress={goToUsername}
            isYellow={false}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default SetPassword;
