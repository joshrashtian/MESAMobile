import { View, Text, Pressable } from "react-native";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MenuButton = ({
  link,
  title,
  icon,
  func,
}: {
  link?: any;
  title: string;
  icon: any;
  func?: () => void;
}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const buttonValue = useSharedValue(1);
  const colorValue = useSharedValue("#eee");

  const buttonAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(buttonValue.value, {
          duration: 400,
          easing: Easing.inOut(Easing.quad),
        }),
      },
    ],
    backgroundColor: withTiming(colorValue.value, {
      duration: 400,
      easing: Easing.inOut(Easing.quad),
    }),
  }));

  return (
    <AnimatedPressable
      onPress={() => {
        router.push(link);
      }}
      onPressIn={() => {
        buttonValue.value = 0.95;
        colorValue.value = "#DDD";
      }}
      onPressOut={() => {
        buttonValue.value = 1;
        colorValue.value = "#eee";
      }}
      style={[
        buttonAnimation,
        {
          width: "49%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 5,
          borderRadius: 10,
        },
      ]}
    >
      <Ionicons name={icon} size={16} />
      <Text style={{ fontFamily: "eudoxus" }}>{title}</Text>
    </AnimatedPressable>
  );
};

export default MenuButton;
