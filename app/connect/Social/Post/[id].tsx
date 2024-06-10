import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { PostType } from "../../../(components)/Post";
import { LinearGradient } from "expo-linear-gradient";
import { type FileObject } from "@supabase/storage-js";
import CarouselData from "../../../(auth)/CarouselData";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel/src/Carousel";

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
      style={{ flex: 1, paddingHorizontal: 10, paddingTop: 30 }}
      colors={[
        "transparent", //"rgba(255, 99, 71,0.3)"
      ]}
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
        <Text style={{ fontFamily: "eudoxus", fontSize: 14 }}>
          by {post.creator.realname}
        </Text>
        <Text style={{ fontFamily: "eudoxus", fontSize: 14 }}>
          Posted {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </Pressable>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {image && (
          <Carousel
            width={width - 40}
            height={400}
            panGestureHandlerProps={{
              activeOffsetX: [-30, 20],
            }}
            autoPlay
            loop
            autoPlayInterval={6000}
            mode={"parallax"}
            data={image}
            renderItem={({ item }) => (
              <View style={{ padding: 5 }}>
                <Image
                  borderRadius={50}
                  src={`https://gnmpzioggytlqzekuyßuo.supabase.co/storage/v1/object/public/postPictures/${id}/${item.name}`}
                  alt={item.name}
                  style={{ width: "100%", height: 400, objectFit: "cover" }}
                />
              </View>
            )}
          />
        )}

        <ScrollView contentContainerStyle={{}}>
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
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Post;
