import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#f86" },
        contentStyle: {
          flex: 1,
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Social Home" }} />
      <Stack.Screen name="Post/[id]" options={{ presentation: "modal" }} />
      <Stack.Screen name="Creator/post" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default Layout;
