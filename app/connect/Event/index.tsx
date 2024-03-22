import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EventHome = () => {
  return (
    <View style={styles.core}>
      <Text style={{ fontFamily: "eudoxus", fontSize: 30 }}>Events</Text>
    </View>
  );
};

export default EventHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    paddingTop: 70,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    padding: 10,
    gap: 20,
    zIndex: 10,
  },
});
