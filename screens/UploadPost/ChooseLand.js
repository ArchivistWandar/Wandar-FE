import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Container, LoadingContainer } from "../../components/Shared";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { gql, useQuery } from "@apollo/client";
import { currentUsernameVar } from "../../apollo";
import Swiper from "react-native-swiper";

export const SEE_LAND_QUERY = gql`
  query SeeLand($username: String!) {
    seeLand(username: $username) {
      landname
      id
      composition
      isMine
    }
  }
`;

const HeaderRightText = styled.Text`
  color: ${colors.yellow};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
  font-family: "JostSemiBold";
`;

const windowWidth = Dimensions.get("window").width;

export default function ChooseLand({ route, navigation }) {
  const { selectedPhotos, memoText } = route.params;
  const [selectedLandIndex, setSelectedLandIndex] = useState(0);

  const username = currentUsernameVar();
  const { data, loading, error } = useQuery(SEE_LAND_QUERY, {
    variables: { username },
  });

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Preview", {
          selectedPhotos,
          memoText: memoText,
          selectedLand: lands?.[selectedLandIndex],
          selectedLandId: lands?.[selectedLandIndex].id,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (lands?.length > 0) {
      setSelectedLandIndex(0);
    }
  }, [lands]);

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [selectedLandIndex]);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>Error loading lands: {error.message}</Text>
      </Container>
    );
  }

  if (!data?.seeLand || data.seeLand.length === 0) {
    return (
      <Container>
        <Text>No lands available</Text>
      </Container>
    );
  }

  const lands = data?.seeLand.map((land) => ({
    id: land.id,
    name: land.landname,
    image: require("../../assets/images/land1.webp"),
  }));

  return (
    <Container>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "JostSemiBold",
            fontSize: 22,
          }}
        >
          Choose a land for your upload
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Swiper
            style={{ height: 300 }}
            showsButtons={true}
            loop={false}
            dotColor="grey"
            activeDotColor="white"
            onIndexChanged={(index) => setSelectedLandIndex(index)}
            nextButton={
              <Ionicons name="chevron-forward" size={30} color="#fff" />
            }
            prevButton={<Ionicons name="chevron-back" size={30} color="#fff" />}
          >
            {lands.map((land, index) => (
              <View
                key={land.id}
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Image
                  source={land.image}
                  style={{
                    width: windowWidth * 0.6,
                    marginTop: "30%",
                    height: "50%",
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    fontFamily: "JostSemiBold",
                    color: "white",
                  }}
                >
                  {land.name}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>
      </View>
    </Container>
  );
}
