import React, { useState, useEffect } from "react";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import { Container } from "../../components/Shared";
import {
  AuthButtonContainer,
  AuthTitle,
} from "../../components/auth/AuthShared";
import { ScrollView } from "react-native";
import ProfileSelect from "../../components/ProfileSelect";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

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

const SetProfile = ({ route, navigation }) => {
  const { username, email, password } = route.params;

  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate("Login", {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
      onError: (error) => {
        console.error("Error creating account:", error.message);
        // TODO: Handle the error appropriately. For example, you can set an error message state here.
        // setErrorMessage(error.message);
      },
    }
  );

  const onValid = (data) => {
    console.log(data);
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      }).catch((error) => {
        console.error("Mutation error:", error);
      });
    }
  };

  useEffect(() => {
    // Register your input fields
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });

    // Set the values for your fields
    setValue("username", username);
    setValue("email", email);
    setValue("password", password);
  }, [register, setValue, username, email, password]);

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
          onPress={handleSubmit(onValid)}
          isYellow={false}
          loading={loading}
        />
      </AuthButtonContainer>
    </Container>
  );
};

export default SetProfile;
