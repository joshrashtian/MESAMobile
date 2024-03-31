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
import UpcomingEvent from "../(components)/FrontPage/UpcomingEvent";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MenuButton from "../(components)/Components/MenuButton";
import {router} from "expo-router";

const ConnectHome = () => {
  const user: ContextProps = useUser();

  const timeNow = new Date(Date.now());

  return (
    <View style={styles.core}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user.data?.avatar_url && (
          <TouchableOpacity
            onPress={() => router.push('/connect/Settings/')}
            style={{
              width: 38,
              borderRadius: 200,
              height: 38,
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
          </TouchableOpacity>
        )}
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
          ,{" "}
          {user.user?.user_metadata.real_name
            ? user.user.user_metadata.real_name
            : user.data?.real_name}
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
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <MenuButton link={"/connect/Social/"} title="Social" icon="people" />
          <MenuButton
            link={"/connect/Event/ForYouEvents/"}
            title="Events For You"
            icon="calendar"
          />
        </View>
      </View>
    </View>
  );
};

export default ConnectHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
    backgroundColor: "#E65C4F",
    padding: 10,
    paddingVertical: 100,
  },
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
  },
  welcometext: {
    fontSize: 20,
    fontFamily: "eudoxus",
    fontWeight: "bold",
    color: "#fff",
  },
});
