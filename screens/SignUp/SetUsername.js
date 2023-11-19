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
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const VERIFY_USERNAME = gql`
  query duplicateVerifyUsername($username: String!) {
    duplicateVerifyUsername(username: $username)
  }
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
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
  const [checkUsername, { loading }] = useLazyQuery(VERIFY_USERNAME, {
    onCompleted: (data) => {
      setIsCheckingUsername(false);
      const usernameExists = data?.duplicateVerifyUsername;
      if (usernameExists) {
        setErrorMessage("Your username is already taken. Please try another.");
      } else {
        setErrorMessage("");
      }
    },
    onError: () => {
      setIsCheckingUsername(false);
      setErrorMessage("An error occurred while checking the username.");
    },
  });

  const _handleUsernameChange = (inputUsername) => {
    setUsername(inputUsername);
    if (
      inputUsername.length >= 3 &&
      !/^[0-9]/.test(inputUsername) &&
      /^[A-Za-z0-9_]+$/.test(inputUsername)
    ) {
      setIsCheckingUsername(true);
      checkUsername({ variables: { username: inputUsername } });
    } else {
      setIsCheckingUsername(false);
    }
  };

  // username 변경에 대한 유효성 검사
  useEffect(() => {
    let newErrorMessage = "";
    if (username.length > 0) {
      if (!/^[A-Za-z0-9_]+$/.test(username)) {
        newErrorMessage =
          "Please use only English characters, numbers, or '_'.";
      } else if (username.length < 3) {
        newErrorMessage = "Username must be at least 3 characters long.";
      } else if (/^[0-9]/.test(username)) {
        newErrorMessage = "Username must not start with a number.";
      }
    }

    if (newErrorMessage !== errorMessage) {
      setErrorMessage(newErrorMessage);
    }

    if (username.length >= 3 && !newErrorMessage && !isCheckingUsername) {
      setIsCheckingUsername(true);
      checkUsername({ variables: { username } });
    }
  }, [username]);

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

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  // mutation

  const [createAccountMutation, { loading: creatingAccount }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createAccount: { ok },
        } = data;
        if (ok) {
          // Handle successful account creation (e.g., navigate to login)
          navigation.navigate("Login", { username, password });
        }
      },
      onError: (error) => {
        console.error("Error creating account:", error.message);
        // Set appropriate error message
      },
    }
  );

  const onValid = () => {
    if (!creatingAccount) {
      createAccountMutation({
        variables: {
          username, // Remove '@' if included in the username
          email,
          password,
        },
      }).catch((error) => {
        console.error("Mutation error:", error);
      });
    }
  };

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
        {isCheckingUsername && (
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
        )}

        {!isCheckingUsername && errorMessage && (
          <AuthErrorMessage>{errorMessage}</AuthErrorMessage>
        )}

        <AuthButtonContainer>
          <AuthButton
            text="Create Account"
            disabled={disabled}
            onPress={onValid}
            isYellow={false}
            loading={creatingAccount}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default SetUsername;
