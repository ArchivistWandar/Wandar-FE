import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import {
  AuthButtonContainer,
  AuthTextBox,
  AuthTextInput,
} from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { styled } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Container } from "../components/Shared";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
    }
  }
`;

const TextInput = styled.TextInput`
  padding: 20px 17px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.disabled ? "#F13C3C" : "white")};
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 20px;
  font-family: "JostMediumItalic";
  font-size: 14px;
  color: white;
`;

const Logo = styled.Image`
  max-width: 70%;
  width: 100%;
  height: 10%;
  margin: 100px auto;
  margin-bottom: 30px;
`;

const Login = ({ route: { params } }) => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token, watch("username"));
    } else {
      // Display an alert if login is not successful
      alert("Login failed. Please check your username and password.");
    }
  };

  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    setValue("username", params?.username);
    setValue("password", params?.password);
  }, [params, setValue]);

  // Watch the values to enable/disable the submit button
  const usernameValue = watch("username");
  const passwordValue = watch("password");
  const isFormFilled = usernameValue && passwordValue;

  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <AuthLayout>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          autoCapitalize={"none"}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("username", text)}
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
          value={watch("username")}
        />
        <AuthTextBox login={true}>
          <AuthTextInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry={!showPassword}
            returnKeyType="done"
            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("password", text)}
            value={watch("password")}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              color={"white"}
              size={24}
            />
          </TouchableOpacity>
        </AuthTextBox>
        <AuthButtonContainer>
          <AuthButton
            text="Log In"
            disabled={!isFormFilled}
            isYellow={false}
            onPress={handleSubmit(onValid)}
            loading={loading}
          />
        </AuthButtonContainer>
      </AuthLayout>
    </Container>
  );
};

export default Login;
