import React, { useCallback, useEffect, useState } from "react";
import { isLoaded, useFonts } from "expo-font";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import LoggedInNav from "./navigators/LoggedInNav";
import { LogBox } from "react-native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, {
  TOKEN,
  currentUsernameVar,
  isLoggedInVar,
  tokenVar,
} from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RequestProcessedProvider } from "./components/RequestProcessedProvider";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [isProcessed, setRequestProcessed] = useState(false);

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

  // 로그인 상태 초기화 함수
  const initializeLoginState = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const username = await AsyncStorage.getItem("username");
    if (token && username) {
      isLoggedInVar(true);
      tokenVar(token);
      currentUsernameVar(username);
    }
  };

  useEffect(() => {
    initializeLoginState();
  }, []);

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

  return (
    <RequestProcessedProvider value={{ isProcessed, setRequestProcessed }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </ApolloProvider>
    </RequestProcessedProvider>
  );
}
