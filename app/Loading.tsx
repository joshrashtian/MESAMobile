import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const Loading = () => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#0A0", "transparent"]}>
      <StatusBar />
    </LinearGradient>
  );
};

export default Loading;

const styles = StyleSheet.create({});
