import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LayoutProfile = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { paddingTop: 40 } }}
    />
  );
};

export default LayoutProfile;
