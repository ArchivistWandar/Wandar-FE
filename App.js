import React, { useCallback, useEffect } from "react";
import { isLoaded, useFonts } from "expo-font";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import LoggedInNav from "./navigators/LoggedInNav";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isFontsLoaded] = useFonts({
    JostBlack: require("./assets/fonts/Jost-Black.ttf"),
    JostBlackItalic: require("./assets/fonts/Jost-BlackItalic.ttf"),
    JostBold: require("./assets/fonts/Jost-Bold.ttf"),
    JostBoldItalic: require("./assets/fonts/Jost-BoldItalic.ttf"),
    JostExtraBold: require("./assets/fonts/Jost-ExtraBold.ttf"),
    JostExtraBoldItalic: require("./assets/fonts/Jost-ExtraBoldItalic.ttf"),
    JostExtraLight: require("./assets/fonts/Jost-ExtraLight.ttf"),
    JostExtraLightItalic: require("./assets/fonts/Jost-ExtraLightItalic.ttf"),
    JostItalic: require("./assets/fonts/Jost-Italic.ttf"),
    JostLight: require("./assets/fonts/Jost-Light.ttf"),
    JostLightItalic: require("./assets/fonts/Jost-LightItalic.ttf"),
    JostMedium: require("./assets/fonts/Jost-Medium.ttf"),
    JostMediumItalic: require("./assets/fonts/Jost-MediumItalic.ttf"),
    JostRegular: require("./assets/fonts/Jost-Regular.ttf"),
    JostSemiBold: require("./assets/fonts/Jost-SemiBold.ttf"),
    JostSemiBoldItalic: require("./assets/fonts/Jost-SemiBoldItalic.ttf"),
    JostThin: require("./assets/fonts/Jost-Thin.ttf"),
    JostThinItalic: require("./assets/fonts/Jost-ThinItalic.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    try {
      if (isFontsLoaded) {
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    } catch (error) {
      console.error("Error while hiding splash screen:", error);
    }
  }, [isFontsLoaded]);

  useEffect(() => {
    if (isFontsLoaded) {
      handleOnLayout();
    }
  }, [isFontsLoaded, handleOnLayout]);

  if (!isFontsLoaded) {
    return null;
  }

  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
    </NavigationContainer>
  );
}
