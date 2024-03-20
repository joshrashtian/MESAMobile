import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ContextProps, useUser } from "../(contexts)/AuthContext";
import { Link } from "expo-router";

const ConnectHome = () => {
  const user = useUser();
  return (
    <View style={styles.core}>
      <Text>{user.userData?.username}</Text>
      <TouchableOpacity
        onPress={() => {
          user.signOut();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Link href="/connect/testroute/">
        <Text>Test</Text>
      </Link>
    </View>
  );
};

export default ConnectHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column-reverse",
    backgroundColor: "#E65C4C",
  },
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
  },
});
