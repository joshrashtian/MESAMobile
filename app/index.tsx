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
      <View style={styles.primarycontainer}>
        <Text style={styles.primary}>
          A new way to{" "}
          <Text style={{ color: "#050", fontWeight: "bold" }}>connect</Text> to{" "}
          <Text style={{ color: "#A20", fontWeight: "bold" }}>STEM.</Text>
        </Text>
      </View>
    </View>
  );
};

export default EntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
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
});
