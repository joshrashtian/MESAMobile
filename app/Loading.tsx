import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const Loading = () => {
  return (
    <LinearGradient
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      colors={["#aaa", "transparent"]}
    >
      <ActivityIndicator size={50} color={"#a41"} />
      <Text style={{ fontFamily: "eudoxus" }}>
        Hello! Just trying to finish loading a few things...
      </Text>
      <StatusBar />
    </LinearGradient>
  );
};

export default Loading;

const styles = StyleSheet.create({});
