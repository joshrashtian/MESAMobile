import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signin" />
    </Stack>
  );
};

export default AuthStack;
