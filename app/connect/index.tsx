import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ContextProps, useUser } from "../(contexts)/AuthContext";
import { Link } from "expo-router";
import UpcomingEvent from "../(components)/FrontPage/UpcomingEvent";

const ConnectHome = () => {
  const user: ContextProps = useUser();

  const timeNow = new Date(Date.now());

  return (
    <View style={styles.core}>
      <View style={{ flexDirection: "row" }}>
        <Image src={user.data?.avatar_url} />
        <Text style={styles.welcometext}>
          Good{" "}
          {timeNow.getHours() < 12
            ? "morning"
            : timeNow.getHours() < 17
            ? "afternoon"
            : "evening"}
          , {user.data?.real_name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          user.signOut();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <UpcomingEvent />
    </View>
  );
};

export default ConnectHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#E65C4C",
    padding: 10,
  },
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
  },
  welcometext: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
});
