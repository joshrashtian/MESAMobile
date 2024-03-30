import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

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
  const window = useWindowDimensions();

  return (
    <Link
      href={`/connect/Event/Modal/${event.id}`}
      style={{
        shadowColor: "#777",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      }}
    >
      <LinearGradient
        style={{
          backgroundColor: "#FFF",
          justifyContent: "space-between",
          borderRadius: 20,
          height: 240,
          width: window.width - 20,
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
          style={{
            padding: 16,
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontWeight: "600", fontSize: 18, fontFamily: "eudoxus" }}
          >
            {event.name}
          </Text>
          <Text style={{ color: "#888" }}>
            {event.desc?.slice(0, 100)}
            <Text style={{ color: "#aaa" }}>
              {event.desc?.length > 90 && "..."}
            </Text>
          </Text>
          <Text style={{ fontFamily: "mono" }}>
            {months[new Date(event.start).getMonth()]}{" "}
            {new Date(event.start).getDate()}
          </Text>
        </View>
      </LinearGradient>
    </Link>
  );
};

export default EventComponent;

const styles = StyleSheet.create({});
