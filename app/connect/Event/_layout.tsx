import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router, Stack, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../(components)/Components/BackButton";

const LayoutEvents = () => {
  const navigation = useNavigation();

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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Events",
          headerRight: () => (
            <Link href="/connect/Event/CreateEvent/">
              <Ionicons name="add-sharp" size={24} />
            </Link>
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
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="EventList"
        options={{
          title: "Your Saved Events",
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="CreateEvent/index"
        options={{
          title: "Create Event",
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
};

export default LayoutEvents;
