import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const LayoutEvents = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
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
      <Stack.Screen
        name="index"
        options={{
          title: "Events",
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="add-sharp" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Modal/[id]"
        options={{
          title: "Event Modal",
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForYouEvents"
        options={{
          title: "Recommended Events",
        }}
      />
      <Stack.Screen
        name="EventList"
        options={{
          title: "Your Saved Events",
        }}
      />
    </Stack>
  );
};

export default LayoutEvents;
