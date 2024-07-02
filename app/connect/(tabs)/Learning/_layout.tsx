import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
        headerRight: () => (
          <Link href="/connect/CreateQuestion/">
            <Ionicons name="pencil" size={24} />
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "STEM Labs", animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="questions/index"
        options={{ title: "Study Questions" }}
      />
    </Stack>
  );
};

export default LearningLayout;
