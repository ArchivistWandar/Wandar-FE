import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import {
  AuthButtonContainer,
  AuthErrorMessage,
  AuthTextBox,
  AuthTextInfo,
  AuthTextInput,
  AuthTitle,
} from "../../components/auth/AuthShared";
import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "../../components/Shared";
import { gql, useLazyQuery } from "@apollo/client";

const SEARCH_USERS = gql`
  query SearchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      username
    }
  }
`;

const SetUsername = ({ route, navigation }) => {
  const { email, password } = route.params;

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const inputRef = useRef();
  const goToProfile = () =>
    navigation.navigate("SetProfile", { email, password, username });

  const [checkUsername, { loading, data }] = useLazyQuery(SEARCH_USERS);

  const _handleUsernameChange = (username) => {
    if (username.length > 0 && !/^[A-Za-z0-9_]+$/.test(username)) {
      setErrorMessage("Please use only English characters, numbers, or '_'.");
      setIsCheckingUsername(false);
      return;
    }

    setUsername(username);

    if (username.length >= 3) {
      setIsCheckingUsername(true);
      checkUsername({ variables: { keyword: username } });
    } else if (username.length > 0) {
      setErrorMessage("Username must be at least 3 characters long.");
      setIsCheckingUsername(false);
    } else {
      setErrorMessage("");
      setIsCheckingUsername(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setIsCheckingUsername(false);
      if (data && data.searchUsers.length > 0) {
        setErrorMessage("Your username is already taken. Please try another.");
      } else {
        setErrorMessage("");
      }
    }
  }, [data, loading, username.length]);

  useEffect(() => {
    setDisabled(
      !(
        username &&
        username.length >= 3 &&
        !errorMessage &&
        !isCheckingUsername
      )
    );
  }, [username, errorMessage, isCheckingUsername]);

  return (
    <Container>
      <AuthTitle>Add your username</AuthTitle>
      <AuthLayout>
        <AuthTextBox disabled={errorMessage}>
          <View>
            <AuthTextInfo>Username</AuthTextInfo>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "JostMedium", color: "white" }}>
                @
              </Text>
              <AuthTextInput
                placeholder="wandar"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                returnKeyType="next"
                autoCapitalize="none"
                ref={inputRef}
                onLayout={() => inputRef.current?.focus()}
                value={username}
                onChangeText={_handleUsernameChange}
                keyboardType="default"
              />
            </View>
          </View>
        </AuthTextBox>
        {isCheckingUsername ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "2%",
            }}
          >
            <ActivityIndicator
              size="small"
              color="#fff"
              style={{ marginLeft: "3%", marginRight: "2%" }}
            />
            <Text
              style={{
                fontFamily: "JostRegular",
                color: "grey",
                fontSize: 12,
              }}
            >
              Checking username availability...
            </Text>
          </View>
        ) : (
          <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        )}

        <AuthButtonContainer>
          <AuthButton
            text="Continue"
            disabled={disabled}
            onPress={goToProfile}
            isYellow={false}
            loading={false}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default SetUsername;
