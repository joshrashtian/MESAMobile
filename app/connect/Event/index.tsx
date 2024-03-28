import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import EventComponent, { EventType } from "../../(components)/EventComponent";
import { useUser } from "../../(contexts)/AuthContext";
import { getEvents } from "./fetchEvents";
import { Link } from "expo-router";
import Animated from "react-native-reanimated";

const EventHome = () => {
  const [events, setEvents] = useState<EventType[]>();
  const { data } = useUser();

  async function fetchEvents() {
    const { data: FetchedData, error } = await supabase
      .from("events")
      .select()
      .range(0, 4)
      .gte("start", new Date(Date.now()).toISOString())
      .order("start");

    if (error) {
      console.log(error);
      return;
    }

    setEvents(FetchedData);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const buttons = [
    {
      name: "Saved Events",
      link: "/connect/Event/EventList",
    },
    {
      name: "For You",
      link: "/connect/Event/ForYouEvents",
    },
  ];

  return (
    <View style={styles.core}>
      <View style={{ flexDirection: "row" }}>
        {buttons.map((e) => (
          <Link
            href={e.link}
            style={{
              width: "33%",
            }}
            onPress={() => {}}
          >
            <Animated.View
              style={{
                backgroundColor: "#eee",
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text>{e.name}</Text>
            </Animated.View>
          </Link>
        ))}
      </View>
      <FlatList
        data={events}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={(e) => (
          <View style={{ padding: 2.5 }}>
            <EventComponent color={"rgba(300,200,200,0.3)"} event={e.item} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.between} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ActivityIndicator />}
      />
    </View>
  );
};

export default EventHome;

const styles = StyleSheet.create({
  core: {
    flex: 1,

    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    padding: 10,
    gap: 10,
    zIndex: 10,
  },
  between: {
    height: 1,
    width: "100%",
    margin: 5,
    backgroundColor: "",
  },
});
