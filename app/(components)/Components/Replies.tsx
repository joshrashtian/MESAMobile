import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { useUser } from "../../(contexts)/AuthContext";
import Reply from "./Reply";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const Replies = (Props: {
  id: string | string[] | undefined;
  creatorid: string;
}) => {
  const [data, setData] = useState<any[]>();
  const { user } = useUser();
  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("replies")
        .select()
        .eq("post_id", Props.id)
        .limit(3);

      if (error) {
        console.error(error);
        return;
      }
      //@ts-ignore
      setData(data);
      return;
    }

    get();
  }, []);

  if (!data || data.length === 0) return;
  return (
    <Animated.View
      entering={FadeInDown}
      style={{
        backgroundColor: "#eee",
        borderRadius: 20,
        padding: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "eudoxusbold",
            fontSize: 16,
          }}
        >
          Replies
        </Text>
        <Text
          style={{
            fontFamily: "eudoxus",
            fontSize: 16,
          }}
        >
          {data?.length ?? null}
        </Text>
      </View>
      <FlatList
        data={data}
        //@ts-ignore
        renderItem={({ item, index }) => {
          if (item.private) {
            if (user?.id === Props.creatorid || user?.id === item.user_id)
              return <Reply contents={item} key={index} />;
            else return;
          }
          return <Reply contents={item} key={index} />;
        }}
        /*ListFooterComponent={
          <TouchableOpacity
            style={{
              backgroundColor: "#00A",
              padding: 10,
              borderRadius: 10,
              marginTop: 4,
            }}
          >
            <Text
              style={{ fontFamily: "eudoxus", fontSize: 16, color: "#fff" }}
            >
              Show More
            </Text>
          </TouchableOpacity>
        }*/
      />
    </Animated.View>
  );
};

export default Replies;
