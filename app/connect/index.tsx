import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ContextProps, useUser } from "../(contexts)/AuthContext";
import { Link } from "expo-router";
import UpcomingEvent from "../(components)/FrontPage/UpcomingEvent";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const ConnectHome = () => {
  const user: ContextProps = useUser();

  const timeNow = new Date(Date.now());

  return (
    <View style={styles.core}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 48,
            borderRadius: 200,
            height: 48,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
          }}
        >
          <Animated.Image
            entering={FadeIn.delay(500).duration(400)}
            src={user.data?.avatar_url}
            style={{
              resizeMode: "cover",
              width: "100%",
              height: "100%",
              borderRadius: 200,
            }}
          />
        </View>
        <Animated.Text
          entering={FadeInUp.delay(800)}
          style={styles.welcometext}
        >
          Good{" "}
          {timeNow.getHours() < 12
            ? "morning"
            : timeNow.getHours() < 17
            ? "afternoon"
            : "evening"}
          , {user.user?.user_metadata?.real_name}
        </Animated.Text>
      </View>
      <View
        style={{
          gap: 4,
        }}
      >
        <UpcomingEvent />
        <View
          style={{
            height: 40,
            width: "100%",
            flexDirection: "row",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#fff",
              width: "50%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 3,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Ionicons name="people" size={16} />
            <Link href="/connect/Social/" style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "eudoxus" }}>Social</Text>
            </Link>
          </Pressable>
          <View
            style={{
              backgroundColor: "#fff",
              width: "50%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 3,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
            }}
          >
            <Ionicons name="calendar-clear" size={16} />
            <Link href="/connect/Social/" style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "eudoxus" }}>Events</Text>
            </Link>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          user.signOut();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConnectHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#E65C4C",
    padding: 10,
    paddingVertical: 100,
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
