import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PollType } from "./Polls";
import { supabase } from "../../../../supabase";

const Poll = ({ poll }: { poll: PollType }) => {
  const [selected, setSelected] = useState<number>();
  const [classes, setClasses] = useState<{ num: string; category: string }[]>();

  async function getRelations() {
    let { data, error } = await supabase
      .schema("information")
      .from("classes")
      .select("category, num")
      .in("id", poll.relations);

    if (error) console.log(error);
    else {
      // @ts-ignore
      setClasses(data);
    }
  }

  useEffect(() => {
    getRelations();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        marginVertical: 5,
        padding: 20,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View>
        <Text style={{ fontSize: 15, fontFamily: "mono", fontWeight: "bold" }}>
          {classes &&
            classes?.length > 0 &&
            `${classes?.map((e) => `${e.category}-${e.num}`)} | `}
          {""}
          {poll.correct !== null ? "Question" : "Poll"}
        </Text>
        <Text style={{ fontFamily: "eudoxus", fontSize: 20 }}>
          {poll.question}
        </Text>
        <Text>asked by {poll.creator.username}</Text>
      </View>

      <View style={{ gap: 3, marginTop: 20 }}>
        {poll.options.map((e, i) => (
          <TouchableOpacity
            onPress={() => setSelected(i)}
            key={i}
            style={{
              padding: 16,
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: selected === i ? "#eee" : "#f6f6f6",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 5,
                backgroundColor: "#000",
              }}
            />
            <Text>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Poll;
