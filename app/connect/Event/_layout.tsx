import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LayoutEvents = () => {
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
      <Stack.Screen name="index" options={{ title: "Event Home" }} />
      <Stack.Screen
        name="Modal/[id]"
        options={{ title: "Event Modal", presentation: "modal" }}
      />
    </Stack>
  );
};

export default LayoutEvents;
