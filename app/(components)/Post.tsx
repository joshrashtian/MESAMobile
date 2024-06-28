import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { months } from "./EventComponent";

export type PostType = {
  id: string;
  userid: string;
  created_at: Date;
  title: string;
  data: any;
  type?: string;
  tags?: string[];
  creator: {
    name: string;
    id: string;
    username: string;
    realname: string;
  };
};

const Post = ({ post }: { post: PostType }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data;
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/connect/Post/${post.id}`);
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        colors={["#fff", "#fff"]}
        style={{
          width: "100%",
          borderRadius: 8,
          shadowColor: "#777",
          padding: 20,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          marginBottom: 3,
          shadowRadius: 1,
        }}
      >
        <Text style={{ fontFamily: "eudoxusbold", fontSize: 18 }}>
          {post.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontFamily: "eudoxus", color: "#555" }}>
            {post.creator.realname}
          </Text>
          <Text style={{ fontFamily: "eudoxus", color: "#555" }}>
            {`${months[new Date(post.created_at).getMonth()]} ${new Date(
              post.created_at
            ).getDate()}, ${new Date(post.created_at).getUTCFullYear()}`}
          </Text>
        </View>
        <Text style={{ fontFamily: "eudoxus" }}>{data[0].text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({});
