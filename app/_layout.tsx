import { View, Text, Appearance, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthContextProvider, useUser } from "./(contexts)/AuthContext";

const RootLayout = () => {
  const colorscheme = useColorScheme();
  const user = useUser();

  const router = useRouter();

  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle:
            colorscheme === "dark"
              ? { backgroundColor: "#000" }
              : { backgroundColor: "#333" },
        }}
      />
    </AuthContextProvider>
  );
};

export default RootLayout;
