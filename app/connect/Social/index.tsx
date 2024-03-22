import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import Post, { PostType } from "../../(components)/Post";
import Wim from "../../(components)/Wim";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const SocialHome = () => {
  const [postsRendered, setPostsRendered] = useState<PostType[]>();
  const [count, setCount] = useState<number | null>(0);
  const [currentCount, setCurrentCount] = useState<number>();

  async function addMoreData() {
    if (!currentCount || !count) return;

    if (currentCount === count + 1) return;

    const amountToAdd = count > currentCount + 6 ? 6 : count - currentCount;

    console.log("amount to add", currentCount + amountToAdd);
    const { data, error } = await supabase
      .from("posts")
      .select()
      .order("created_at", { ascending: false })
      .range(currentCount + 1, currentCount + amountToAdd);

    if (error || !postsRendered) {
      console.log(error);
      return;
    }

    setCurrentCount((e: any) => e + 6);
    setPostsRendered([...postsRendered, ...data]);
  }

  async function fetchData() {
    const {
      data,
      error,
      count: NewCount,
    } = await supabase
      .from("posts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(0, 5);

    if (error) {
      console.log(error.message);
      return;
    }

    setPostsRendered(data);
    setCount(NewCount);
    setCurrentCount(5);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.core}>
      <Text style={styles.heading}>Activity Going On</Text>
      <FlatList
        data={postsRendered}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ActivityIndicator />}
        ListFooterComponent={() =>
          currentCount !== count + 1 && (
            <ActivityIndicator style={{ padding: 5 }} />
          )
        }
        renderItem={(post) => {
          switch (post.item.type) {
            case "post":
              return (
                <Animated.View entering={FadeInUp}>
                  <Post post={post.item} />
                </Animated.View>
              );
            case "wim":
              return <Wim post={post.item} />;
            default:
              return null;
          }
        }}
        onEndReached={() => {
          addMoreData();
        }}
        style={{ zIndex: 0 }}
      />
      <Animated.View
        style={[styles.add, {}]}
        entering={FadeInDown.easing(Easing.circle)}
      >
        <Ionicons name="add-sharp" color="#Fff" size={20} />
      </Animated.View>
    </View>
  );
};

export default SocialHome;

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
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: Platform.OS === "android" ? "eudoxus" : "",
    color: "#000",
  },
  add: {
    width: 48,
    height: 48,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f04",
    borderRadius: 40,
    right: 20,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
  },
});
