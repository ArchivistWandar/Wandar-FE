import React from "react";
import { Image, Text, View } from "react-native";
import { Container } from "../../components/Shared";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";

const lands = [
  {
    id: "1",
    name: "Jeju 🍊",
    image: require("../../assets/images/land1.webp"),
  },
  {
    id: "2",
    name: "Daily 🌈",
    image: require("../../assets/images/land2.png"),
  },
];

export default function ChooseLand() {
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
        <Swiper
          showsButtons={true}
          buttonWrapperStyle={{ color: "#fff", backgroundColor: "transparent" }}
          nextButton={
            <Ionicons name="chevron-forward" size={30} color="#fff" />
          }
          prevButton={<Ionicons name="chevron-back" size={30} color="#fff" />}
          dotColor="grey"
          activeDotColor="white"
        >
          {lands.map((land) => (
            <View
              key={land.id}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
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
        </Swiper>
      </View>
    </Container>
  );
}
