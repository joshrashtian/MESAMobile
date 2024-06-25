import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { PostType } from "../../(components)/Post";
import { LinearGradient } from "expo-linear-gradient";
import { type FileObject } from "@supabase/storage-js";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import { Ionicons } from "@expo/vector-icons";
import Replies from "../../(components)/Components/Replies";

const Post = () => {
  const [post, setPost] = useState<PostType>();
  const { id } = useLocalSearchParams();
  const [image, setImages] = useState<FileObject[] | null>();

  const width = Dimensions.get("window").width;

  const getImages = useCallback(async () => {
    // @ts-ignore
    const { data, error } = await supabase.storage
      .from("postPictures")
      //@ts-ignore
      .list(id);

    if (error) {
      console.log("Error:", error.message);
    } else {
      setImages(data);
    }
  }, []);

  useEffect(() => {
    const fetchingData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      }
      if (data?.images) {
        getImages();
      }

      setPost(data);
    };
    fetchingData();
  }, []);

  if (!post) return <ActivityIndicator />;
  return (
    <LinearGradient
      style={{ paddingHorizontal: 10, paddingTop: 30, gap: 4 }}
      colors={[
        "transparent", //"rgba(255, 99, 71,0.3)"
      ]}
    >
      <Text
        style={{
          fontFamily: "eudoxusbold",
          color: "rgba(240, 0, 0, 0.6)",
          fontSize: 24,
        }}
      >
        {post.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            gap: 4,
            backgroundColor: "#eee",
            padding: 4,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: "space-between",
          }}
          onPress={() => {
            router.push(`/connect/Profile/Profile/${post.userid}`);
          }}
        >
          <Text
            style={{
              fontFamily: "eudoxus",
              fontSize: 14,
              gap: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Ionicons name="person-circle-outline" size={14} />{" "}
            {post.creator.realname}
          </Text>
        </Pressable>
        <Text
          style={{
            fontFamily: "eudoxus",
            justifyContent: "center",
            alignContent: "center",
            fontSize: 14,
            gap: 5,
            flexDirection: "row",
          }}
        >
          <Ionicons name="calendar-number" size={14} />
          {"  "}
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
      <View
        style={{
          padding: 0.5,
          backgroundColor: "rgba(240, 0, 0, 0.6)",
          marginVertical: 10,
        }}
      />
      <ScrollView contentContainerStyle={{ gap: 5 }}>
        {image && (
          <Carousel
            width={width - 40}
            height={300}
            panGestureHandlerProps={{
              activeOffsetX: [-30, 20],
            }}
            autoPlay
            style={{
              backgroundColor: "#ddd",
            }}
            autoPlayInterval={6000}
            data={image}
            renderItem={({ item }) => (
              <View style={{ padding: 5 }}>
                <Image
                  source={{
                    uri: `https://gnmpzioggytlqzekuyuo.supabase.co/storage/v1/object/public/postPictures/${id}/${item.name}`,
                  }}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                  }}
                />
              </View>
            )}
          />
        )}

        <View
          style={{
            backgroundColor: "#eee",
            borderRadius: 20,
            padding: 20,
            gap: 10,
          }}
        >
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
                      backgroundColor: "#112",
                      padding: 10,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "mono",
                        color: "#fff",
                        fontSize: 11,
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
        <Replies id={id} creatorid={post.userid} />
      </ScrollView>
    </LinearGradient>
  );
};

export default Post;
