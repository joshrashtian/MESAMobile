import {
  ActivityIndicator,
  FlatList,
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

const ForYouEvents = () => {
  const [events, setEvents] = useState<EventType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user, data } = useUser();

  async function fetchEvents() {
    if (!data?.boxlist) return;

    let query: any = [];

    data.boxlist.map((e: any) => {
      if (e.type === "skills") {
        query.push(e.skills);
      }
    });

    if (!query[0]) return;
    const finalQuery = query[0].join(" or");

    console.log(finalQuery);
    const {
      data: Events,
      count,
      error,
    } = await supabase
      .from("events")
      .select("*", { count: "exact" })
      .textSearch("name", finalQuery, {
        type: "websearch",
      });
    //.gte("start", new Date(Date.now()).toISOString());

    if (error) {
      console.log(error);
      return;
    }
    setEvents(Events);
    setLoading(false);
  }

  //

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <ActivityIndicator />;
  return (
    <View style={styles.core}>
      <Text style={{ fontFamily: "eudoxus", fontSize: 30 }}>Recommended</Text>
      <FlatList
        data={events}
        pagingEnabled
        renderItem={(e) => (
          <EventComponent color={"rgba(0,200,300,0.3)"} event={e.item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.between} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <Text>It looks a little empty around here...</Text>
        )}
      />
    </View>
  );
};

export default ForYouEvents;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    paddingTop: 70,
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    padding: 10,
    gap: 20,
    zIndex: 10,
  },
  between: {
    height: 1,
    width: "100%",
    margin: 5,
    backgroundColor: "",
  },
});
