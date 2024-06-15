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

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const colorscheme = useColorScheme();

  // prettier-ignore
  const [fontsLoaded, fontLoadError] = useFonts({
    'eudoxus': require("../assets/fonts/EudoxusSans-Medium.ttf"),
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
      <AuthContextProvider>
        <Slot />
        <StatusBar />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
