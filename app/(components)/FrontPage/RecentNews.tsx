import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../../supabase";
import { openBrowserAsync } from "expo-web-browser";

export type NewsArticle =
  | {
      title: string;
      category: string;
      created_at: Date;
      id: number;
    }
  | {
      title: string;
      category: string;
      tags: string[];
      created_at: Date;
      id: number;
      userid: string;
      details: any;
    };

const RecentNews = () => {
  const [article, setArticle] = useState<NewsArticle>();
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

  async function getNews() {
    const { data, error } = await supabase
      .from("newsposts")
      .select("title, category, created_at, id")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      return;
    } else setArticle(data);
  }

  useEffect(() => {
    getNews();
  });

  return (
    <AnimatedPressable
      onPress={() => {
        openBrowserAsync(`https://mesaconnect.io/news?arid=${article?.id}`);

        colorValue.value = "#eee";
      }}
      onPressIn={() => {
        colorValue.value = "#DDD";
      }}
      onPressOut={() => {
        colorValue.value = "#eee";
      }}
      style={[
        buttonAnimation,
        {
          width: "98%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 11,
          borderRadius: 10,
        },
      ]}
    >
      <Ionicons name="newspaper-sharp" size={20} />
      <View>
        {article ? (
          <>
            <Text style={{ fontFamily: "eudoxus", fontSize: 13 }}>
              {article?.title}
            </Text>
            <Text
              style={{
                fontFamily: "eudoxus",
                fontSize: 11,
                color: "#777",
                textTransform: "capitalize",
              }}
            >
              {article?.category}
            </Text>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default RecentNews;
