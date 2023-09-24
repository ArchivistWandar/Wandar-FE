import React, { useRef, useState, useEffect } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import {
  AuthButtonContainer,
  AuthContainer,
} from "../components/auth/AuthShared";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import { styled } from "styled-components/native";
import { colors } from "../colors";

const TextInput = styled.TextInput`
  padding: 12px 17px;
  border-radius: 10px;
  border: 1px solid ${(props) => (props.disabled ? "#F13C3C" : "white")};
  margin-left: 10px;
  margin-right: 10px;
  font-family: "JostMediumItalic";
  font-size: 14px;
  color: white;
  width: 250px;
`;

const Login = () => {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);
  return (
    <AuthContainer>
      <AuthLayout>
        <TextInput
          placeholder="Username"
          returnKeyType="next"
          autoCapitalize={"none"}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("username", text)}
        />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          returnKeyType="done"
          lastOne={true}
          placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={(text) => setValue("password", text)}
        />
      </AuthLayout>
      <AuthButtonContainer>
        <AuthButton text="Continue" disabled={disabled} isYellow={false} />
      </AuthButtonContainer>
    </AuthContainer>
  );
};

export default Login;
