import { View, Text, Appearance, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Slot, Stack, useRouter } from "expo-router";
import {
  AuthContextProvider,
  ContextProps,
  UserData,
  useUser,
} from "./(contexts)/AuthContext";
import ConnectLayout from "./connect/_layout";
import AuthStack from "./(auth)/_layout";

const RootLayout = () => {
  const colorscheme = useColorScheme();
  const user: ContextProps = useUser();

  useEffect(() => {
    if (!user) return;

    if (user.signedIn()) {
      router.replace("/connect/");
    } else if (!user.signedIn()) {
      router.replace("/(auth)");
    }
  }, [user]);

  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
};

export default RootLayout;
