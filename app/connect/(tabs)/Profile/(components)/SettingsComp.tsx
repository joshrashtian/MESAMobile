import { View, Text, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
const SettingsComp = () => {
  return (
    <Animated.View
      entering={FadeInDown.springify()}
      style={{ flexDirection: "row", marginTop: 10, gap: 2, width: "100%" }}
    >
      <Pressable
        style={{ width: "49.5%" }}
        onPress={() => router.push("/connect/Profile/Following")}
      >
        <LinearGradient
          style={{
            height: 64,
            padding: 10,
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: 10,
          }}
          start={{ x: 0.49, y: 0 }}
          colors={["#23F", "#56F"]}
        >
          <Ionicons name="people" color="#fff" size={24} />
          <Text style={{ fontFamily: "eudoxus", color: "#FFF" }}>
            View Following
          </Text>
        </LinearGradient>
      </Pressable>
      <Pressable
        style={{ width: "49.5%" }}
        onPress={() => router.push("/connect/Settings")}
      >
        <LinearGradient
          style={{
            height: 64,
            padding: 10,
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: 10,
          }}
          start={{ x: 0.49, y: 0 }}
          colors={["#B429F9", "#56F"]}
        >
          <Ionicons name="settings" color="#fff" size={24} />
          <Text style={{ fontFamily: "eudoxus", color: "#FFF" }}>Settings</Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

export default SettingsComp;
