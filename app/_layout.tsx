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

const RootLayout = () => {
  SplashScreen.preventAutoHideAsync();

  const colorscheme = useColorScheme();
  const user: ContextProps = useUser();

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
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <AuthContextProvider>
        <Slot />
      </AuthContextProvider>
    </View>
  );
};

export default RootLayout;
