import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useMemo, useState } from "react";
import { ContextProps, useUser } from "../../(contexts)/AuthContext";
import UpcomingEvent from "../../(components)/FrontPage/UpcomingEvent";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import MenuButton from "../../(components)/Components/MenuButton";
import { router } from "expo-router";
import CarouselTopPage from "../../(components)/FrontPage/CarouselTopPage";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import RecentNews from "../../(components)/FrontPage/RecentNews";
import NewBottomSheet from "../../(components)/FrontPage/BottomSheet";

const ConnectHome = () => {
  const user: ContextProps = useUser();
  const NewImage = Animated.createAnimatedComponent(Image);
  const timeNow = new Date(Date.now());

  const backgroundBottomSheet = useCallback(
    (props: any) => (
      <LinearGradient
        {...props}
        locations={[0, 0.49]}
        colors={["#FFF", "rgb(67 56 202)"]}
      />
    ),
    []
  );

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
            onPress={() => router.push("/connect/Settings/")}
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
            <NewImage
              entering={FadeIn.delay(500).duration(400)}
              source={{ uri: user.data?.avatar_url }}
              style={{
                resizeMode: "cover",
                width: 38,
                height: 38,
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
      <View>
        <CarouselTopPage />
      </View>
      <NewBottomSheet />
    </View>
  );
};

export default ConnectHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,
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
    fontFamily: "eudoxusbold",
    fontWeight: "bold",
    color: "#fff",
  },
});
