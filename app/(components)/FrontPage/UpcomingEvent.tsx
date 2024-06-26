import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { useUser } from "../../(contexts)/AuthContext";
import { supabase } from "../../../supabase";
import { EventType } from "../EventComponent";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
      .order("start")
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      return;
    }
    setEvent(FetchedData);
  }

  useEffect(() => {
    fetchEvents();
  }, [user]);

  if (!event)
    return (
      <TouchableOpacity onPress={() => router.push(`/connect/Event`)}>
        <Animated.View
          entering={FadeInUp.easing(Easing.inOut(Easing.quad))}
          style={{
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.7,
            shadowRadius: 3,
            padding: 8,
            height: 100,
            justifyContent: "flex-end",
          }}
        >
          <Ionicons name="calendar-number" size={24} />
          <Text style={{ fontFamily: "eudoxusbold" }}>
            Currently, You Have No Events Coming Up.
          </Text>
          <Text style={{ fontFamily: "eudoxus", color: "#333" }}>
            Tap Here To Go To Event Hub
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );

  const date = new Date(event.start);
  const now = new Date(Date.now());

  return (
    <TouchableOpacity
      onPress={() => router.push(`/connect/EventModal/${event.id}`)}
    >
      <Animated.View
        entering={FadeInUp.easing(Easing.inOut(Easing.quad))}
        style={{
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 3,
        }}
      >
        <Image
          src={event?.image?.url}
          style={{
            width: "100%",
            height: 100,
          }}
        />
        <View style={{ padding: 8 }}>
          <Text style={{ fontFamily: "eudoxusbold" }}>
            Coming Up In{" "}
            {now.getMonth() < date.getMonth()
              ? `${date.getMonth() - now.getMonth()} Months`
              : now.getDate() < date.getDate()
              ? `${date.getDate() - now.getDate()} Days`
              : now.getHours() < date.getHours()
              ? `${date.getHours() - now.getHours()} ${
                  date.getHours() - now.getHours() === 1 ? "Hour" : "Hours"
                }`
              : event.end && new Date(event.end).getTime() > now.getTime()
              ? `${date.getMinutes() - now.getMinutes()} Minutes`
              : "ONGOING EVENT"}
          </Text>
          <Text style={{ fontFamily: "eudoxus", color: "#333" }}>
            {event.name}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default UpcomingEvent;
