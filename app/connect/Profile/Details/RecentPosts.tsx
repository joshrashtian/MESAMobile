import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import Post, { PostType } from "../../../(components)/Post";
import Wim from "../../../(components)/Wim";
import { supabase } from "../../../../supabase";

type ProfPosts = {
  id: string;
};
const RecentPostsProfile = (Props: ProfPosts) => {
  const [posts, setPosts] = useState<PostType[]>();

  async function fetch() {
    const { data: FetchedData, error } = await supabase
      .from("posts")
      .select("*")
      .eq("userid", Props.id)
      .order("created_at", { ascending: false })

      .limit(10);
    if (error) {
      console.log(error);
      return;
    }
    setPosts(FetchedData);
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <View>
      <Text style={{ fontFamily: "eudoxus", fontSize: 20, marginBottom: 10 }}>
        Recent Posts
      </Text>
      {posts?.map((post) => {
        switch (post.type) {
          case "post":
            return (
              <Animated.View key={post.id} entering={FadeInUp.springify()}>
                <Post post={post} />
              </Animated.View>
            );
          case "wim":
            return <Wim key={post.id} post={post} />;
          default:
            return null;
        }
      })}
    </View>
  );
};

export default RecentPostsProfile;

const styles = StyleSheet.create({});
