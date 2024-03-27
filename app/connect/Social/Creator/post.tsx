import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useMemo, useState } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { supabase } from "../../../../supabase";
import { useUser } from "../../../(contexts)/AuthContext";
import { router } from "expo-router";

const PostCreator = () => {
  const user = useUser();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const createPost = async () => {
    const { error } = await supabase.from("posts").insert([
      {
        userid: user.user?.id,
        title: title,
        data: {
          data: [
            {
              type: "text",
              text: body,
            },
          ],
        },
        type: "post",
        creator: {
          id: user.user?.id,
          realname: user.data?.real_name,
          username: user.data?.username,
        },
      },
    ]);
    if (error) {
      console.log(error);
    }
    router.dismiss();
  };

  // Submit Button
  const submitStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(title ? "#E1341E" : "#eee", {
      duration: 200,
      easing: Easing.inOut(Easing.quad),
    }),
    color: withTiming(title ? "#fff" : "#000", {
      duration: 200,
      easing: Easing.inOut(Easing.quad),
    }),
    padding: 10,
    borderRadius: 10,
  }));

  return (
    <View style={styles.core}>
      <View style={{ gap: 15 }}>
        <Text
          style={{
            fontFamily: "eudoxus",
            fontSize: 28,
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Create Post
        </Text>
        <KeyboardAvoidingView
          style={{
            gap: 10,
          }}
        >
          <TextInput
            placeholder="Post Title..."
            onChangeText={(e) => {
              setTitle(e);
            }}
            style={[styles.input, { fontSize: 16 }]}
          />
          <TextInput
            placeholder="Contents of Post..."
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(e) => setBody(e)}
            style={styles.input}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => (title && body ? createPost() : null)}>
          <Animated.Text style={submitStyle}>Submit Post</Animated.Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostCreator;

const styles = StyleSheet.create({
  core: {
    paddingTop: 40,
    padding: 20,
    gap: 15,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontFamily: "eudoxus",
  },
});
