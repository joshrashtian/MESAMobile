import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useDialog } from "../(contexts)/DialogBox";
import { supabase } from "../../supabase";
import Animated, { FadeOutLeft } from "react-native-reanimated";
import { useUserData } from "../(contexts)/AuthContext";

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
  const menu = useDialog();
  const { id } = useUserData();
  const Wrapper = Animated.createAnimatedComponent(TouchableOpacity);
  const LongPressMenu = useCallback(() => {
    menu.open({
      title: `${event.name}`,
      titleStyle: { color: "#fff", fontSize: 18 },
      disengagable: true,
      icon: "calendar",
      iconSettings: {
        color: "#fff",
        size: 28,
      },
      backgroundComponent: (props: any) => (
        <LinearGradient
          {...props}
          locations={[0, 0.49]}
          colors={["#4096BF", "#BF6940"]}
        />
      ),
      customButtons: [
        {
          title: "Delete",
          visible: event.creator === id,
          onPress: () => {
            supabase
              .from("events")
              .delete()
              .eq("id", event.id)
              .then(() => console.log(`Deleted event: ${event.name} `));
            menu.close();
          },
        },
        {
          title: "Close Menu",
        },
      ],
    });
  }, []);
  return (
    <Wrapper
      exiting={FadeOutLeft.springify()}
      onPress={() => router.push(`/connect/EventModal/${event.id}`)}
      onLongPress={LongPressMenu}
      style={{
        shadowColor: "#777",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        width: "100%",
        zIndex: 50,
        shadowRadius: 1,
        minWidth: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          justifyContent: "space-between",
          width: "100%",
          minHeight: 100,
          maxHeight: 275,
        }}
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
            {new Date(event.start).getDate()} {event?.tags?.length > 0 && "/"}{" "}
            {event.tags[0]}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};

export default EventComponent;

const styles = StyleSheet.create({});
