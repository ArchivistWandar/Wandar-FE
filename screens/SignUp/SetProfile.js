import React, { useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { Container } from "../../components/Shared";
import {
  AuthButtonContainer,
  AuthTitle,
} from "../../components/auth/AuthShared";
import { ScrollView } from "react-native";
import ProfileSelect from "../../components/ProfileSelect";

const SetProfile = () => {
  const username = "wandar";

  return (
    <Container>
      <ScrollView>
        <AuthLayout>
          <AuthTitle profile={true}>
            Welcome {username}! {"\n"}Choose your profile
          </AuthTitle>
          <ProfileSelect />
        </AuthLayout>
      </ScrollView>
      <AuthButtonContainer>
        <AuthButton
          text="Continue"
          disabled={false}
          // onPress={}
          isYellow={false}
        />
      </AuthButtonContainer>
    </Container>
  );
};

export default SetProfile;
