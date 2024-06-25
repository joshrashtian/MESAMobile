import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../../supabase";
import EventComponent, {
  EventType,
} from "../../../(components)/EventComponent";
import { useUser } from "../../../(contexts)/AuthContext";
import { Link } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const EventHome = () => {
  const [events, setEvents] = useState<EventType[]>();
  const [refreshing, setRefreshing] = useState(false);
  const user = useUser();

  async function fetchEvents() {
    const { data: FetchedData, error } = await supabase
      .from("events")
      .select()
      .range(0, 6)
      .gte("start", new Date(Date.now()).toISOString())
      .order("start");

    if (error) {
      console.log(error);
      return;
    }

    setEvents(FetchedData);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  const buttons = [
    {
      name: "Saved Events",
      link: "/connect/Event/EventList",
      icon: <Ionicons name="heart" size={16} />,
    },
    {
      name: "For You",
      link: "/connect/Event/ForYouEvents",
      icon: <Ionicons name="calendar" size={16} />,
    },
  ];

  const refresh = useCallback(async () => {
    setRefreshing(true);
    fetchEvents();
  }, []);

  return (
    <View style={styles.core}>
      <FlatList
        data={events}
        //pagingEnabled
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <ScrollView
            contentContainerStyle={{
              gap: 10,

              flexDirection: "row",
              backgroundColor: "#f9f9f9",
            }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {buttons.map((e) => (
              <Link href={e.link} key={e.link} style={{ marginBottom: 10 }}>
                <View
                  style={{
                    width: Dimensions.get("window").width / 2 - 15,
                    padding: 10,
                    height: 60,
                    backgroundColor: "#ededed",
                    justifyContent: "flex-end",
                    borderRadius: 10,
                  }}
                >
                  {e.icon}
                  <Text style={{ fontFamily: "eudoxus" }}>{e.name}</Text>
                </View>
              </Link>
            ))}
          </ScrollView>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
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
