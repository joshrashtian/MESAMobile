import { View, Text } from "react-native";
import React from "react";
import {Stack} from "expo-router";

const LearningLayout = () => {
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
      }}>
      <Stack.Screen name="index" options={{ title: 'STEM Labs', animation: 'slide_from_left' }} />
    </Stack>
  );
};

export default LearningLayout;
