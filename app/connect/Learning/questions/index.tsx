import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../../supabase";
import { PollType } from "../Polls";
import Poll from "../poll";
import { Ionicons } from "@expo/vector-icons";
import { getQuestions } from "./functions";

const Index = () => {
  const [polls, setPolls] = useState<PollType[]>([]);
  const [filter, setFilter] = useState<any>();

  const buttons = useMemo(() => {
    return [
      {
        title: "Edit Filters",
        icon: <Ionicons name="build" size={16} />,
        function() {},
      },
      {
        title: "Questions",
        icon: <Ionicons name="bookmarks" size={16} />,
        filter: { correct: false },
        function() {
          setFilter({ correct: true });
        },
      },
      {
        title: "Polls",
        icon: <Ionicons name="menu-outline" size={16} />,
        function() {
          setFilter({ correct: false });
        },
      },
    ];
  }, []);

  useEffect(() => {
    async function get() {
      let { data, error } = await getQuestions(filter);
      if (error) {
        alert(error.message);
        return;
      }
      console.log("filtered");
      setPolls(data);
    }
    get();
  }, [filter]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={polls}
        ListHeaderComponent={
          <ScrollView
            contentContainerStyle={{ gap: 10 }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {buttons.flatMap((e) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  width: Dimensions.get("window").width / 2 - 15,
                  height: 60,
                  backgroundColor: "#ededed",
                  justifyContent: "flex-end",
                  borderRadius: 10,
                }}
                onPress={e.function}
              >
                {e.icon}
                <Text style={{ fontFamily: "eudoxus" }}>{e.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
        pagingEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ActivityIndicator />}
        renderItem={({ item }) => <Poll poll={item} />}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
