import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
// 모듈 불러오기

export default function Location() {
  return (
    <View style={styles.container}>
      <Svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 5.62278C9 3.62337 10.5677 2 12.5 2C14.4323 2 16 3.62337 16 5.62278C16 7.92522 13.6667 11.5697 12.8099 12.8284C12.7743 12.8816 12.7277 12.9248 12.6739 12.9546C12.62 12.9845 12.5604 13 12.5 13C12.4396 13 12.38 12.9845 12.3261 12.9546C12.2723 12.9248 12.2257 12.8816 12.1901 12.8284C11.3333 11.5692 9 7.92337 9 5.62278ZM14 5.5C14 6.32843 13.3284 7 12.5 7C11.6716 7 11 6.32843 11 5.5C11 4.67157 11.6716 4 12.5 4C13.3284 4 14 4.67157 14 5.5Z"
          fill="#6B78B7"
          stroke="#6B78B7"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.40418 12C-0.998815 13.7397 0.852225 23 12.5542 23C24.2558 23 26.1455 13.7397 18.1256 12"
          stroke="#6B78B7"
          strokeWidth="1.8"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
