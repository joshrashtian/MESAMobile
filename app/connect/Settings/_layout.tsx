import React from "react";
import { View, Text } from "react-native";
import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerBackVisible: false,

        headerTitle: ({ children }) => (
          <Text style={{ fontFamily: "eudoxus", fontSize: 16 }}>
            {children}
          </Text>
        ),
        headerStyle: { backgroundColor: "#fff" },
        contentStyle: {
          flex: 1,
          backgroundColor: "#f9f9f9",
        },
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Settings", presentation: "modal" }}
      />
    </Stack>
  );
};

export default SettingsLayout;
