import { View, Text, Appearance, useColorScheme } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, Slot, Stack, useRouter } from "expo-router";
import {
  AuthContextProvider,
  ContextProps,
  UserData,
  useUser,
} from "./(contexts)/AuthContext";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { supabase } from "../supabase";
import { StatusBar } from "expo-status-bar";
import { Provider } from "./(contexts)/Provider";

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const colorscheme = useColorScheme();

  // prettier-ignore
  const [fontsLoaded, fontLoadError] = useFonts({
    'eudoxus': require("../assets/fonts/EudoxusSans-Medium.ttf"),
    'eudoxusbold': require("../assets/fonts/EudoxusSans-Bold-BF659b6cb1408e5.ttf"),
    'mono': require("../assets/fonts/JetBrainsMono-Medium.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider>
        <Slot />
        <StatusBar style="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
