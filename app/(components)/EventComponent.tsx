import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type EventType = {
  id: string;
  created_at: any;
  name: string;
  desc: string;
  start: Date;
  end?: Date;
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
    <TouchableOpacity
      onPress={() => router.push(`/connect/EventModal/${event.id}`)}
      style={{
        shadowColor: "#777",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        width: "100%",
        shadowRadius: 1,
        minWidth: "100%",
      }}
    >
      <LinearGradient
        style={{
          backgroundColor: "#FFF",
          justifyContent: "space-between",
          width: "100%",
        }}
        colors={["transparent", "transparent"]}
      >
        {event.image ? (
          <Image
            src={event?.image?.url}
            style={{
              width: "100%",
              height: "50%",
            }}
          />
        ) : (
          <View />
        )}
        <View
          style={{
            padding: 16,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              fontFamily: "eudoxusbold",
            }}
          >
            {event.name}
          </Text>
          <Text style={{ color: "#888", fontFamily: "eudoxus" }}>
            {event.desc?.slice(0, 100)}
            <Text style={{ color: "#aaa" }}>
              {event.desc?.length > 90 && "..."}
            </Text>
          </Text>
          <Text style={{ fontFamily: "eudoxus" }}>
            {months[new Date(event.start).getMonth()]}{" "}
            {new Date(event.start).getDate()} / {event.tags[0]}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default EventComponent;

const styles = StyleSheet.create({});
