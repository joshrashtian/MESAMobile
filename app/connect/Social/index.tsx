import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";

const SocialHome = () => {
  return (
    <View style={styles.core}>
      <Text style={styles.heading}>Activity Going On</Text>
    </View>
  );
};

export default SocialHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column-reverse",
    backgroundColor: "#eee",
    padding: 10,
  },
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "eudoxus" : "",
    color: "#000",
  },
});
