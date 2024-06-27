import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LayoutProfile = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: ({ children }) => (
          <Text style={{ fontFamily: "eudoxus", fontSize: 16 }}>
            {children}
          </Text>
        ),
        contentStyle: { paddingTop: 40 },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Your Profile" }}
      />
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
