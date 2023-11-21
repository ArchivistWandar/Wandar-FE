import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { Container, HeaderRightText } from "../components/Shared";
import {
  AuthTextBox,
  AuthTextInfo,
  AuthTextInput,
  AuthTitle,
} from "../components/auth/AuthShared";
import AuthLayout from "../components/auth/AuthLayout";

const CREATE_LAND_MUTATION = gql`
  mutation CreateLand($landname: String!) {
    createLand(landname: $landname) {
      ok
      error
    }
  }
`;

const LandAdd = ({ navigation }) => {
  const [landname, setLandname] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [createLand, { loading }] = useMutation(CREATE_LAND_MUTATION, {
    onCompleted: (data) => {
      setIsUploading(false);
      if (data.createLand.ok) {
        Alert.alert("Success", `Land ${landname} created successfully`);
        // Optionally navigate back or to another screen
      } else {
        Alert.alert("Error", data.createLand.error);
      }
    },
  });

  const handleCreateLand = () => {
    setIsUploading(true);
    if (!landname) {
      Alert.alert("Error :(", "Please enter a landname");
      return;
    }
    createLand({ variables: { landname } });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleCreateLand} disabled={loading}>
          {isUploading ? (
            <ActivityIndicator
              size="small"
              color={"white"}
              style={{ marginRight: "10%" }}
            />
          ) : (
            <HeaderRightText>Create</HeaderRightText>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleCreateLand, loading]);

  return (
    <Container>
      <AuthTitle>Enter the name of the land</AuthTitle>
      <AuthLayout>
        <AuthTextBox>
          <View>
            <AuthTextInfo>name</AuthTextInfo>
            <AuthTextInput
              placeholder="daily✨"
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              returnKeyType="next"
              autoCapitalize={"none"}
              value={landname}
              onChangeText={setLandname}
            />
          </View>
        </AuthTextBox>
      </AuthLayout>
    </Container>
  );
};

export default LandAdd;
