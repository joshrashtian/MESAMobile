import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useAnimatedValue,
  useWindowDimensions,
  RefreshControl,
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
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Link, router } from "expo-router";

const SocialHome = () => {
  const [postsRendered, setPostsRendered] = useState<PostType[]>();
  const [count, setCount] = useState<number | null>(0);
  const [currentCount, setCurrentCount] = useState<number>();
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const window = useWindowDimensions();

  async function addMoreData() {
    if (!currentCount || !count) return;

    if (currentCount === count) return;

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
    setRefreshing(true);
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
    setRefreshing(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("posts channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          //filter: `userid=eq.${user.user?.id}`
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            console.log(payload.old.id);
            setPostsRendered((posts) =>
              postsRendered?.filter((e) => e.id !== payload.old.id)
            );
            setCount((count) => count && count + 1);
          }
          if (payload.eventType === "INSERT") {
            setPostsRendered((posts: any) => [payload.new, ...posts]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const toggleAdd = () => {
    setAddOpen(!addOpen);

    if (!addOpen) {
      AddWidth.value = withTiming(window.width - 40, {
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      });
      Color.value = "#fff";
      buttonOpacities.value = withDelay(
        500,
        withTiming(1, {
          duration: 900,
          easing: Easing.inOut(Easing.quad),
        })
      );
    } else {
      AddWidth.value = withTiming(48, {
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      });
      Color.value = "#f04";
      buttonOpacities.value = withTiming(0, {
        duration: 400,
        easing: Easing.inOut(Easing.quad),
      });
    }
  };
  //Animations

  const AddWidth = useSharedValue(48);
  const Color = useSharedValue("#f04");
  const buttonOpacities = useSharedValue(0);

  const addStyle = useAnimatedStyle(() => ({
    width: withSpring(AddWidth.value),
    backgroundColor: withTiming(Color.value, { duration: 400 }),
  }));

  const buttonOn = useAnimatedStyle(() => ({
    transform: [{ scale: buttonOpacities.value }],
  }));

  return (
    <View style={styles.core}>
      <Text style={styles.heading}>Activity Going On</Text>
      <FlatList
        data={postsRendered}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ActivityIndicator />}
        ListFooterComponent={() =>
          currentCount !== count && <ActivityIndicator style={{ padding: 5 }} />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              fetchData();
            }}
          />
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
        style={[styles.add, addStyle]}
        entering={FadeInDown.easing(Easing.circle)}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => toggleAdd()}
        >
          <Ionicons name="add-sharp" color="#Fff" size={20} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          buttonOn,
          {
            position: "absolute",
            bottom: 20,
            width: "100%",
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          },
        ]}
      >
        <LinearGradient
          style={{
            width: 100,
            height: 40,

            borderRadius: 5,
          }}
          colors={["#eee", "#dedede"]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.push("/connect/Social/Creator/post")}
          >
            <Text
              style={{
                fontFamily: "eudoxus",
                fontSize: 16,
                color: "#000",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Post
            </Text>
          </TouchableOpacity>
        </LinearGradient>
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
    flexDirection: "row",
    borderRadius: 40,
    right: 20,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
  },
});
