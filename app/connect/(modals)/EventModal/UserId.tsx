import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import { Image } from "expo-image";
import Animated, { FadeIn } from "react-native-reanimated";

const UserId = ({ userid }: { userid: string }) => {
  const [name, setName] = useState<{ real_name: string; avatar_url: string }>();
  useEffect(() => {
    async function getRealname() {
      const { data, error } = await supabase
        .from("profiles")
        .select("real_name, avatar_url")
        .eq("id", userid)
        .single();
      if (error) {
        console.log(error);
      } else {
        setName(data);
      }
    }
    getRealname();
  }, []);

  if (!name) return <ActivityIndicator />;
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#dedede",
        borderRadius: 40,
        alignItems: "center",
        padding: 4,
        gap: 6,
      }}
    >
      <Animated.Image
        entering={FadeIn}
        source={{ uri: name?.avatar_url }}
        style={{
          width: 24,
          height: 24,
          borderRadius: 30,
          backgroundColor: "#AAA",
        }}
      />
      <Text
        style={{
          fontFamily: "eudoxusbold",
          color: "rgba(25, 55, 160, 0.8)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}
      >
        Created by {name?.real_name}
      </Text>
    </View>
  );
};

export default UserId;
