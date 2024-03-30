import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const EntryPage = () => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.primarycontainer}
        entering={FadeInDown.duration(1000)}
      >
        <Text style={styles.primary}>
          A new way to{" "}
          <Text style={{ color: "#050", fontWeight: "bold" }}>connect</Text> to{" "}
          <Text style={{ color: "#A20", fontWeight: "bold" }}>STEM.</Text>
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          style={styles.signin}
        >
          <Text style={{ color: "#fff", fontFamily: "eudoxus" }}>
            Let's Sign In
          </Text>
          <Ionicons name="arrow-forward-sharp" color="#FFF" size={16} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#E65C4C",
  },
  primary: {
    fontSize: 30,
    fontWeight: "bold",
    width: "80%",
  },
  primarycontainer: {
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "60%",
    backgroundColor: "#FFF",
  },
  signin: {
    backgroundColor: "#e40",
    borderRadius: 1000,
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
