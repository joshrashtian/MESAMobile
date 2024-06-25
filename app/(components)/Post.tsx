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
          padding: 20,
          marginBottom: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 2,
        }}
      >
        <Text style={{ fontFamily: "eudoxus", fontSize: 20 }}>
          {post.title}
        </Text>
        <Text>{data[0].text}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "eudoxus", marginTop: 12 }}>
            {post.creator.realname}
          </Text>
          <Text style={{ fontFamily: "eudoxus", marginTop: 12 }}>
            {new Date(post.created_at).toLocaleDateString()}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Post;

const styles = StyleSheet.create({});
