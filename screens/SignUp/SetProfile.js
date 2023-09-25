import React from "react";
import { View } from "react-native";
import {
  AuthButtonContainer,
  AuthContainer,
  AuthTitle,
} from "../../components/auth/AuthShared";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";

const SetProfile = () => {
  const username = "wandar";
  return (
    <AuthContainer>
      <AuthLayout>
        <AuthTitle>
          Welcome {username}!{"\n"}Choose your profile
        </AuthTitle>
      </AuthLayout>
      <AuthButtonContainer>
        <AuthButton
          text="Continue"
          disabled={false}
          // onPress={}
          isYellow={false}
        />
      </AuthButtonContainer>
    </AuthContainer>
  );
};

export default SetProfile;
