import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ExpoFile from "expo-file-system";
import Animated, {
  Easing,
  FadeInDown,
  FadeInUp,
  FadeOutLeft,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { supabase } from "../../../../../supabase";
import { useUser } from "../../../../(contexts)/AuthContext";
import { router } from "expo-router";
import { decode } from "base64-arraybuffer";
import FormInput from "../../../../(components)/Components/Input";
import { Ionicons } from "@expo/vector-icons";

const PostCreator = () => {
  const user = useUser();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const [image, setImage] = useState<string>();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const IonAnimated = Animated.createAnimatedComponent(Ionicons);
  const createPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert([
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
          images: !!image,
        },
      ])
      .select("id");
    if (error) {
      console.log(error);
      return;
    }
    if (data[0]?.id && image) {
      const file = await ExpoFile.readAsStringAsync(image, {
        encoding: "base64",
      });
      const { data: PathName, error } = await supabase.storage
        .from("postPictures")
        .upload(`${data[0].id}/context.png`, decode(file), {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/png",
        });
      if (error) console.error(error.message);
    }
    await router.dismiss();
  };

  const uploadImage = useCallback(async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (image.canceled) return;
    setImage(image.assets[0].uri);
  }, []);

  // Submit Button
  const submitStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(title ? "#E1341E" : "#eee", {
      duration: 200,
      easing: Easing.inOut(Easing.quad),
    }),
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  }));

  const AnimatedText = useAnimatedStyle(() => ({
    color: withTiming(title ? "#fff" : "#000", {
      duration: 200,
      easing: Easing.inOut(Easing.quad),
    }),
  }));

  return (
    <View style={styles.core}>
      <View style={{ gap: 15 }}>
        <Text
          style={{
            fontFamily: "eudoxusbold",
            color: "rgba(240, 0, 0, 0.6)",
            fontSize: 36,
          }}
        >
          Create Post
        </Text>
        <KeyboardAvoidingView style={{}}>
          <FormInput
            placeholder="Post Title..."
            onChangeText={(e) => {
              setTitle(e);
            }}
          />
          <FormInput
            placeholder="Contents of Post..."
            multiline
            numberOfLines={4}
            maxLength={300}
            onChangeText={(e) => setBody(e)}
          />
        </KeyboardAvoidingView>
      </View>
      {image && (
        <Animated.View
          style={{
            padding: 10,
            backgroundColor: "#eee",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.Image
            entering={FadeInDown}
            src={image}
            style={{ width: 150, height: 150, borderRadius: 30 }}
          />
        </Animated.View>
      )}
      <View style={{ gap: 4, width: "100%" }}>
        <Pressable
          onPress={uploadImage}
          style={{
            backgroundColor: "#E1341E",
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            borderRadius: 10,
          }}
        >
          <Ionicons name="image-outline" size={24} color="white" />
          <Animated.Text
            style={{ color: "#fff", fontSize: 17, fontFamily: "eudoxus" }}
          >
            Upload Image
          </Animated.Text>
        </Pressable>
        <AnimatedPressable
          style={submitStyle}
          onPress={() => (title && body ? createPost() : null)}
        >
          <Ionicons name="cloud-upload" size={24} color="color" />

          <Animated.Text
            style={[AnimatedText, { fontSize: 17, fontFamily: "eudoxus" }]}
          >
            Submit Post
          </Animated.Text>
        </AnimatedPressable>
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
