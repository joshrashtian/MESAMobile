import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";

const Reply = ({ contents, key }: { contents: any; key: number }) => {
  const [creator, setCreator] = useState<any>();
  useEffect(() => {
    async function get() {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, real_name")
        .eq("id", contents.user_id)
        .single();
      if (error) alert(error.message);
      else setCreator(data);
    }
    get();
  });

  return (
    <View
      style={{
        padding: 15,
        margin: 4,
        justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 6,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
      }}
    >
      <Text style={{ fontFamily: "eudoxusbold" }}>
        {creator?.real_name ?? "Loading"}
      </Text>
      <Text>{contents.reply}</Text>
    </View>
  );
};

export default Reply;
