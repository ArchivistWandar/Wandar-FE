import React from "react";
import styled from "styled-components/native";
import { Container } from "../../components/Shared";
import { Image } from "react-native";

const MyTimeline = ({ records, posts, lands, lastUpdate }) => {
  console.log(records, posts, lands, lastUpdate);

  // Function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Ensure records is an array before mapping
  const timelineData = Array.isArray(records)
    ? records.sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <Container>
      <TimelineContainer>
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            {/* Display first photo from each record */}
            {item.photos && item.photos.length > 0 && (
              <NotificationBox>
                <LeftContent>
                  <PostImage source={{ uri: item.photos[0].photo }} />
                </LeftContent>
                <RightContent record={true}>
                  <NotificationText>New Wandar Record</NotificationText>
                  <DateText>{formatDate(item.date)}</DateText>
                </RightContent>
              </NotificationBox>
            )}

            {/* Logic for posts and lands can be added here if needed */}
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
  border-color: transparent;
  background-color: white;
  border-radius: 10px;
  height: 66px;
  position: relative;
`;

const LeftContent = styled.View`
  flex: 1;
  padding-left: 10px;
  /* align-items: center; */
  justify-content: center;
`;
const PostImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;
const RightContent = styled.View`
  flex: 6;
  justify-content: center;
  padding-left: 15px;
`;

const NotificationText = styled.Text`
  font-size: 14px;
  font-family: "JostBoldItalic";
  color: black;
`;

const DateText = styled.Text`
  font-family: "JostMedium";
  font-size: 14px;
  color: black;
  margin-top: auto;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

export default MyTimeline;
