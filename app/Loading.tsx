import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Animated, {
  SlideInDown,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";

const Loading = () => {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInUp.duration(800)}
      exiting={SlideOutDown.duration(800)}
    >
      <ActivityIndicator size="large" color={"#fff"} />
      <Text style={{ fontFamily: "eudoxusbold", color: "#fff", fontSize: 20 }}>
        MESAConnect
      </Text>
      <Text style={{ fontFamily: "eudoxus", color: "#fff", fontSize: 16 }}>
        Your exprience is getting ready...
      </Text>
      <StatusBar style="light" />
    </Animated.View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#E65C4F",
    justifyContent: "center",
    alignItems: "center",
  },
});
