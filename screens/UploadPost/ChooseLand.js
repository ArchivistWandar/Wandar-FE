import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
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

const SEE_LAND_QUERY = gql`
  query SeeLand($username: String!) {
    seeLand(username: $username) {
      landname
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
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: HeaderRight });
  }, [selectedLandIndex]);

  const handleScroll = (event) => {
    const newSelectedIndex = Math.round(
      event.nativeEvent.contentOffset.x / windowWidth
    );
    setSelectedLandIndex(newSelectedIndex);
  };

  const scrollViewRef = useRef(); // Create a ref

  const handleScrollLeft = () => {
    scrollViewRef.current.scrollTo({
      x: windowWidth * (selectedLandIndex - 1),
      animated: true,
    });
  };

  const handleScrollRight = () => {
    scrollViewRef.current.scrollTo({
      x: windowWidth * (selectedLandIndex + 1),
      animated: true,
    });
  };

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
    id: land.landname, // Assuming each land has a unique name
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleScrollLeft}>
            <Ionicons name="chevron-back" size={30} color="#fff" />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {lands.map((land) => (
              <View
                style={{
                  width: windowWidth * 0.8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={land.id}
              >
                <Image
                  source={land.image}
                  style={{ width: "70%", height: "70%" }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 40,
                    fontFamily: "JostSemiBold",
                    color: "white",
                  }}
                >
                  {land.name}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={handleScrollRight}>
            <Ionicons name="chevron-forward" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {lands.map((land, index) => (
            <Text
              key={index}
              style={{ margin: 3, color: "white", fontSize: 10 }}
            >
              {selectedLandIndex === index ? "●" : "○"}
            </Text>
          ))}
        </View>
      </View>
    </Container>
  );
}
