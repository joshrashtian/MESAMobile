import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <>
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
            title: "Community",
            headerRight: (props) => (
              <Link href="/connect/Social/Search/">
                <Ionicons name="search-outline" size={16} color="#f99" />
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="Creator/post"
          options={{ presentation: "modal", title: "Create Post" }}
        />
        <Stack.Screen name="Search/index" options={{ title: "Search" }} />
      </Stack>
    </>
  );
};

export default Layout;
