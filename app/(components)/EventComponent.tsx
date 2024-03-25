import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export type EventType = {
  id: string;
  created_at: any;
  name: string;
  desc: string;
  start: Date;
  end: Date;
  location: string;
  tags: string[];
  type: string;
  creator: string;
  image: {
    url: string;
    creator: string;
  };
};

const EventComponent = ({
  event,
  color,
}: {
  event: EventType;
  color: string;
}) => {
  return (
    <LinearGradient
      style={{
        backgroundColor: "#FFF",
        height: 190,
        justifyContent: "space-between",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      }}
      colors={[color, "transparent"]}
    >
      <Image
        src={event?.image?.url}
        style={{
          width: "100%",
          height: "50%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View
        style={{ padding: 24, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ fontWeight: "600", fontSize: 18 }}>{event.name}</Text>
        <Text style={{ color: "#888" }}>
          {event.desc?.slice(0, 100)}
          <Text style={{ color: "#aaa" }}>
            {event.desc?.length > 90 && "..."}
          </Text>
        </Text>
      </View>
      <Link href={`/connect/Event/${event.id}`}>
        <Image
          src="https://placehold.co/600x400/png"
          style={{ width: "100%", height: "50%" }}
        />
        <View style={{ padding: 24 }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>{event.name}</Text>
          <Text style={{ color: "#888" }}>
            {event.desc?.slice(0, 100)}
            <Text style={{ color: "#aaa" }}>
              {event.desc?.length > 90 && "..."}
            </Text>
          </Text>
        </View>
      </Link>
    </LinearGradient>
  );
};

export default EventComponent;

const styles = StyleSheet.create({});
