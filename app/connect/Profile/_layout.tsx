import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LayoutProfile = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { paddingTop: 40 } }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="Profile/[id]"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="Following/index" options={{ title: "Create Post" }} />
    </Stack>
  );
};

export default LayoutProfile;
