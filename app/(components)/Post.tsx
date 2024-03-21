import { StyleSheet, Text, View } from "react-native";
import React from "react";

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
  return (
    <View>
      <Text>{post.title}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({});
