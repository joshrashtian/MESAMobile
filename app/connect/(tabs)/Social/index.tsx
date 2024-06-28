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
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { supabase } from "../../../../supabase";
import Post, { PostType } from "../../../(components)/Post";
import Wim from "../../../(components)/Wim";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { useUser, useUserData } from "../../../(contexts)/AuthContext";

const SocialHome = () => {
  const [postsRendered, setPostsRendered] = useState<PostType[]>();
  const [count, setCount] = useState<number | null>(0);
  const [currentCount, setCurrentCount] = useState<number>();
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const values = useMemo(() => ["25%", "40%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const window = useWindowDimensions();
  const { id } = useUserData();

  async function addMoreData() {
    if (!currentCount || !count) return;

    if (currentCount === count) return;

    const amountToAdd = count > currentCount + 6 ? 6 : count - currentCount;

    console.log("amount to add", currentCount + amountToAdd);

    console.log(amountToAdd);

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
    setCurrentCount(0);
    const {
      data,
      error,
      count: NewCount,
    } = await supabase
      .from("posts")
      .select("*", { count: "exact" })
      //.neq("userid", id)
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

  const backgroundBottomSheet = useCallback(
    (props: any) => (
      <LinearGradient
        {...props}
        locations={[0, 0.49, 1]}
        colors={["#5E70A1", "#6E5EA1", "#5E91A1"]}
      />
    ),
    []
  );

  return (
    <View style={styles.core}>
      <FlatList
        data={postsRendered}
        ListHeaderComponent={
          <Text style={styles.heading}>Recent Activity</Text>
        }
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
          onPress={() =>
            //toggleAdd()
            bottomSheetRef.current?.expand()
          }
        >
          <MaterialIcons name="post-add" color="#Fff" size={20} />
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
            gap: 10,
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
        <LinearGradient
          style={{
            width: 100,
            height: 40,

            borderRadius: 5,
          }}
          colors={["#cddeee", "#bcdede"]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}
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
              Wim
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
      <BottomSheet
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop
            appearsOnIndex={1}
            disappearsOnIndex={-1}
            {...props}
          />
        )}
        backgroundComponent={backgroundBottomSheet}
        ref={bottomSheetRef}
        backgroundStyle={{ flex: 1 }}
        index={-1}
        enablePanDownToClose={true}
        snapPoints={values}
      >
        <View style={{ padding: 10, flexDirection: "column", gap: 5 }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "eudoxus",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            What would you like to create?
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                router.dismiss();
                router.push("/connect/Social/Creator/post");
              }}
              style={{
                backgroundColor: "#fff",
                padding: 10,
                shadowColor: "#000",
                shadowOpacity: 0.6,
                shadowRadius: 4,
                elevation: 10,
                borderRadius: 2,
                alignItems: "center",
                gap: 4,
                width: "100%",
                flexDirection: "row",
              }}
            >
              <MaterialIcons name="post-add" size={24} />
              <Text style={{ fontFamily: "eudoxus" }}>Post</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.dismiss();
              router.push("/connect/Social/Creator/post");
            }}
            style={{
              backgroundColor: "#fff",
              padding: 10,
              shadowColor: "#000",
              shadowOpacity: 0.6,
              shadowRadius: 4,
              elevation: 10,
              borderRadius: 2,
              alignItems: "center",
              gap: 4,
              width: "100%",
              flexDirection: "row",
            }}
          >
            <MaterialIcons name="lightbulb-outline" size={24} />
            <Text style={{ fontFamily: "eudoxus" }}>Wim</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default SocialHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,

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
    fontFamily: "eudoxus",
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
