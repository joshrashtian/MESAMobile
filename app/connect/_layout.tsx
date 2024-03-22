import { View, Text } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ConnectLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#f00",
        tabBarLabel: ({ children, focused }) => (
          <Text
            style={{ color: focused ? "#f00" : "#aaa", fontFamily: "eudoxus" }}
          >
            {children}
          </Text>
        ),
        tabBarBackground: () => (
          <LinearGradient
            colors={["#edd", "#fff"]}
            start={{ x: 0.46, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Connect",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "#f00" : "#aaa"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Social"
        options={{
          title: "Activity",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="people-circle-outline"
              size={24}
              color={focused ? "#f00" : "#aaa"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Event"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="calendar-number"
              size={24}
              color={focused ? "#f00" : "#aaa"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default ConnectLayout;
