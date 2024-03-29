import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeOutDown } from "react-native-reanimated";

const Loading = () => {
  return (
    <Animated.View
      style={{
        flex: 1,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      exiting={FadeOutDown}
    >
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        colors={["#aaa", "transparent"]}
      >
        <ActivityIndicator size={50} color={"#a41"} />
        <Text style={{ fontFamily: "eudoxus" }}>
          Hello! Just trying to finish loading a few things...
        </Text>
        <StatusBar />
      </LinearGradient>
    </Animated.View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
