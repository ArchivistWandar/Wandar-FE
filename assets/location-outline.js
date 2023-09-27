import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function LocationOutline() {
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
          d="M12.5 2C10.5677 2 9 3.62337 9 5.62278C9 7.92337 11.3333 11.5692 12.1901 12.8284C12.2257 12.8816 12.2723 12.9248 12.3261 12.9546C12.38 12.9845 12.4396 13 12.5 13C12.5604 13 12.62 12.9845 12.6739 12.9546C12.7277 12.9248 12.7743 12.8816 12.8099 12.8284C13.6667 11.5697 16 7.92522 16 5.62278C16 3.62337 14.4323 2 12.5 2Z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.5 6C12.7761 6 13 5.77614 13 5.5C13 5.22386 12.7761 5 12.5 5C12.2239 5 12 5.22386 12 5.5C12 5.77614 12.2239 6 12.5 6Z"
          fill="white"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.40418 12C-0.998815 13.7397 0.852225 23 12.5542 23C24.2558 23 26.1455 13.7397 18.1256 12"
          stroke="white"
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
