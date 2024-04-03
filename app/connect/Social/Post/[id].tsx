import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { PostType } from "../../../(components)/Post";
import { LinearGradient } from "expo-linear-gradient";

const Post = () => {
  const [post, setPost] = useState<PostType>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchingData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id);

      if (error) {
        console.log(error);
        return;
      }
      setPost(data[0]);
    };
    fetchingData();
  }, []);

  if (!post) return <ActivityIndicator />;
  return (
    <LinearGradient
      style={{ flex: 1, paddingHorizontal: 10, paddingTop: 30 }}
      colors={["transparent", "rgba(255, 99, 71,0.3)"]}
    >
      <Text style={{ fontFamily: "eudoxus", fontSize: 24 }}>{post.title}</Text>
      <Pressable
        style={{
          flexDirection: "row",
          gap: 4,
          justifyContent: "space-between",
        }}
        onPress={() => {
          router.push(`/connect/Profile/Profile/${post.userid}`);
        }}
      >
        <Text>by {post.creator.realname}</Text>
        <Text>Posted {new Date(post.created_at).toLocaleDateString()}</Text>
      </Pressable>

      <View style={{ gap: 8, marginTop: 20 }}>
        {post.data.data.map((item: any, index: number) => {
          switch (item.type) {
            case "text":
              return (
                <Text style={{ fontFamily: "eudoxus" }} key={index}>
                  {item.text}
                </Text>
              );

            case "code":
              return (
                <View
                  style={{
                    backgroundColor: "#433",
                    padding: 10,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "mono",
                      color: "#fff",
                    }}
                    key={index}
                  >
                    {item.text}
                  </Text>
                </View>
              );

            default:
              return null;
          }
        })}
      </View>
    </LinearGradient>
  );
};

export default Post;
