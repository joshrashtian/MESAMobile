import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { useUser } from "../../(contexts)/AuthContext";
import { supabase } from "../../../supabase";
import { EventType } from "../EventComponent";
import { Link } from "expo-router";

const UpcomingEvent = () => {
  const user = useUser();
  const [event, setEvent] = useState<EventType>();

  useEffect(() => {
    const channel = supabase
      .channel("posts channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "eventinterest",
          filter: `user_id=eq.${user?.user?.id}`,
        },
        (payload) => {
          console.log("detected change");
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  async function fetchEvents() {
    const { data: EventInterests, error: InterestErr } = await supabase
      .from("eventinterest")
      .select("event_id, id")
      .eq("user_id", user?.user?.id);

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
    setEvent(FetchedData[0]);
  }

  useEffect(() => {
    fetchEvents();
  }, [user]);

  if (!event) return null;

  const date = new Date(event.start);
  const now = new Date(Date.now());

  return (
    <Animated.View
      entering={FadeInUp.easing(Easing.inOut(Easing.quad))}
      style={{
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        borderRadius: 10,
      }}
    >
      <Image src={event?.image?.url} style={{ width: "100%", height: 52 }} />
      <View style={{ padding: 8 }}>
        <Text style={{ fontWeight: "bold" }}>
          UPCOMING IN{" "}
          {now.getMonth() < date.getMonth()
            ? `${date.getMonth() - now.getMonth()} MONTHS`
            : now.getDate() < date.getDate()
            ? `${date.getDate() - now.getDate()} DAYS`
            : now.getHours() < date.getHours()
            ? `${date.getHours() - now.getHours()} ${
                date.getHours() - now.getHours() === 1 ? "HOUR" : "HOURS"
              }`
            : event.end && new Date(event.end).getTime() > now.getTime()
            ? `${date.getMinutes() - now.getMinutes()} MINUTES`
            : "ONGOING EVENT"}
        </Text>
        <Text style={{ fontFamily: "eudoxus" }}>{event.name}</Text>
      </View>
    </Animated.View>
  );
};

export default UpcomingEvent;
