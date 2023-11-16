import React from "react";
import styled from "styled-components/native";
import { Container } from "../../components/Shared";

// Dummy timeline data
const timelineData = [
  {
    id: "1",
    type: "post",
    landname: "Busan 🌊",
    date: "Aug 23, 2023",
  },
  {
    id: "2",
    type: "record",
    landnames: ["Daily 🫧", "Jeju 🍊"],
    date: "Aug 21, 2023",
  },
  {
    id: "3",
    type: "start",
    date: "Aug 8, 2023",
  },
  // Add more timeline data here
];

const MyTimeline = ({ records, posts, lands, lastUpdate }) => {
  const formatLandnames = (landnames) => {
    if (landnames.length === 1) {
      return `Land ${landnames[0]}`;
    } else {
      const formattedLandnames = landnames.join(", ");
      const lastIndex = formattedLandnames.lastIndexOf(",");
      return (
        formattedLandnames.slice(0, lastIndex) +
        " and" +
        formattedLandnames.slice(lastIndex + 1)
      );
    }
  };

  return (
    <Container>
      <TimelineContainer>
        {timelineData.map((item) => (
          <TimelineItem key={item.id}>
            {item.type === "post" && (
              <NotificationBox post={true}>
                <LeftContent>
                  <PostImage
                    source={require("../../assets/images/jeju.png")}
                    resizeMode="contain"
                  />
                </LeftContent>
                <RightContent>
                  <NotificationText post={true}>New post</NotificationText>
                  <LandName post={true}>in Land {item.landname}</LandName>
                  <DateText post={true}>{item.date}</DateText>
                </RightContent>
              </NotificationBox>
            )}
            {item.type === "record" && (
              <NotificationBox>
                <RightContent record={true}>
                  <NotificationText>New Wandar Record</NotificationText>
                  <LandNames>
                    for Land {formatLandnames(item.landnames)}
                  </LandNames>
                  <DateText>{item.date}</DateText>
                </RightContent>
              </NotificationBox>
            )}
            {item.type === "start" && (
              <NotificationBox>
                <LeftContent>
                  <PostImage
                    source={require("../../assets/logo.png")}
                    resizeMode="contain"
                  />
                </LeftContent>
                <RightContent>
                  <NotificationText>Started Wandar</NotificationText>
                  <DateText>{item.date}</DateText>
                </RightContent>
              </NotificationBox>
            )}
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Container>
  );
};

const TimelineContainer = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const TimelineItem = styled.View`
  margin-bottom: 20px;
`;

const NotificationBox = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: ${(props) => (props.post ? "white" : "transparent")};
  background-color: ${(props) => (props.post ? "transparent" : "white")};
  border-radius: 10px;
  height: ${(props) => (props.post ? "60px" : "66px")};
  position: relative;
`;

const LeftContent = styled.View`
  flex: 1;
  padding-left: 10px;
  /* align-items: center; */
  justify-content: center;
`;

const RightContent = styled.View`
  flex: 6;
  justify-content: center;
  padding-left: ${(props) => (props.record ? "20px" : "5px")};
`;

const PostImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const NotificationText = styled.Text`
  font-size: 14px;
  font-family: "JostBoldItalic";
  color: ${(props) => (props.post ? "white" : "black")};
`;

const LandName = styled.Text`
  font-size: 12px;
  color: white;
  font-family: "JostMedium";
`;

const LandNames = styled.Text`
  font-size: 14px;
  color: black;
  font-family: "JostMedium";
`;

const DateText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: ${(props) => (props.post ? "white" : "black")};
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

export default MyTimeline;
