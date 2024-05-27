import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, {useCallback, useState} from "react";
import * as ImagePicker from 'expo-image-picker'
import * as ExpoFile from 'expo-file-system'
import Animated, {
  Easing, FadeInDown,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { supabase } from "../../../../supabase";
import { useUser } from "../../../(contexts)/AuthContext";
import { router } from "expo-router";
import {decode} from "base64-arraybuffer";

const PostCreator = () => {
  const user = useUser();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const [image, setImage] = useState<string>();

  const createPost = async () => {
    const { data, error } = await supabase.from("posts").insert([
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
        images: !!image
      },
    ]).select('id')
    if (error) {
      console.log(error);
      return;
    }
    if(data[0]?.id && image) {
      const file = await ExpoFile.readAsStringAsync(image, { encoding: 'base64' })
      const { data: PathName, error } = await supabase
          .storage
          .from('postPictures')
          .upload(`${data[0].id}/context.png`, decode(file), {
            cacheControl: '3600',
            upsert: false,
            contentType: 'image/png',
          })
      if(error) console.error(error.message)
    }
    await router.dismiss();
  };

  const uploadImage = useCallback(async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    })
    if(image.canceled) return;
    setImage(image.assets[0].uri)
  }, [])

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
      {
        image &&
          <Animated.Image entering={FadeInDown} src={image} style={{width: 100, height: 100}} />
      }
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Pressable onPress={uploadImage}>
          <Animated.Text style={{ backgroundColor: "#E1341E", color: '#fff', padding: 10, borderRadius: 10,}}>Upload Image</Animated.Text>
        </Pressable>
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
