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

const EventList = () => {
  const [events, setEvents] = useState<EventType[]>();
  const { user, data } = useUser();

  async function fetchEvents() {
    const { data: EventInterests, error: InterestErr } = await supabase
      .from("eventinterest")
      .select("event_id, id")
      .eq("user_id", user?.id);

    if (InterestErr) {
      console.log(InterestErr);
      return;
    }

    const interests = EventInterests.map((e) => `${e.event_id}`);

    const { data: FetchedData, error } = await supabase
      .from("events")
      .select()
      .in("id", interests)
      .gte("start", new Date(Date.now()).toISOString())
      .order("start");

    if (error) {
      console.log(error);
      return;
    }

    console.log(FetchedData);

    setEvents(FetchedData);
  }

  //

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <View style={styles.core}>
      <Text style={{ fontFamily: "eudoxus", fontSize: 30 }}>
        Your Saved Events
      </Text>
      <FlatList
        data={events}
        pagingEnabled
        renderItem={(e) => (
          <EventComponent color={"rgba(0,200,300,0.3)"} event={e.item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.between} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <ActivityIndicator />}
      />
    </View>
  );
};

export default EventList;

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
