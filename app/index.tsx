import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect } from "react";

const EntryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.primary}>
        A new way to{" "}
        <Text style={{ color: "#a40", fontWeight: "bold" }}>connect</Text> to
        STEM.
      </Text>
    </View>
  );
};

export default EntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    fontSize: 20,
    fontWeight: "bold",
    width: "50%",
  },
});
