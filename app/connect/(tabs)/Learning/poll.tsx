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
        marginVertical: 5,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        padding: 20,
        margin: 10,
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{ fontSize: 15, fontFamily: "eudoxus", fontWeight: "bold" }}
          >
            {poll.correct !== null ? "Question" : "Poll"}
          </Text>
          {classes && classes?.length > 0 && (
            <Text
              style={{
                fontSize: 15,
                fontFamily: "eudoxus",
                color: "#444",
                fontWeight: "bold",
              }}
            >
              {`${classes?.map((e) => `${e.category}-${e.num}`)} `}
              {""}
            </Text>
          )}
        </View>
        <Text style={{ fontFamily: "eudoxusbold", fontSize: 20 }}>
          {poll.question}
        </Text>
        <Text>asked by {poll.creator?.username}</Text>
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
              backgroundColor:
                selected === i
                  ? poll.correct
                    ? poll.correct === selected
                      ? "#ada"
                      : "#daa"
                    : "#eee"
                  : "#f6f6f6",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <View
              style={{
                borderRightWidth: 1,
                paddingRight: 10,
              }}
            >
              <Text style={{ fontFamily: "eudoxusbold" }}>{i + 1}</Text>
            </View>
            <Text style={{ fontFamily: "eudoxus" }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Poll;
