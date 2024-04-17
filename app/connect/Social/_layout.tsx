import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
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
      }}
    >
      <Stack.Screen name="index" options={{ title: "Community" }} />
      <Stack.Screen
        name="Post/[id]"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="Creator/post"
        options={{ presentation: "modal", title: "Create Post" }}
      />
    </Stack>
  );
};

export default Layout;
