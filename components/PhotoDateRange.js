import React from "react";
import { Text } from "react-native";

function PhotoDateRange({ photos, textStyle }) {
  // 사진들의 생성 시간을 배열로 추출
  const creationTimes = photos.map((photo) => photo.creationTime);

  // 가장 오래된 날짜와 가장 최신 날짜 찾기 (밀리초 단위)
  const oldestDate = new Date(Math.min(...creationTimes));
  const newestDate = new Date(Math.max(...creationTimes));

  // 원하는 형식으로 날짜 포맷팅
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedOldestDate = formatter.format(oldestDate);
  const formattedNewestDate = formatter.format(newestDate);

  return (
    <Text
      style={textStyle}
    >{`${formattedOldestDate} ~ ${formattedNewestDate}`}</Text>
  );
}

export default PhotoDateRange;
