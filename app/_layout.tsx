import { View, Text, Appearance, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  const colorscheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle:
          colorscheme === "dark"
            ? { backgroundColor: "#000" }
            : { backgroundColor: "#BBB" },
      }}
    />
  );
};

export default RootLayout;
