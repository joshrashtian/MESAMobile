import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import EventComponent, {
  EventType,
} from "../../../(components)/EventComponent";
import { supabase } from "../../../../supabase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../../(contexts)/AuthContext";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { addInterest, onInterestLost } from "../../(tabs)/Event/EventInterests";
import { Ionicons } from "@expo/vector-icons";
import UserId from "./UserId";
import { useDialog } from "../../../(contexts)/DialogBox";

const EventModal = () => {
  const [event, setEvent] = useState<EventType>();
  const [state, setState] = useState<number>(1);
  const { id } = useLocalSearchParams();
  const points = useMemo(() => ["30%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>();
  const user = useUser();
  const router = useRouter();
  const { open } = useDialog();
  const backgroundBottomSheet = useCallback(
    (props: any) => (
      <LinearGradient
        {...props}
        locations={[0, 0.49]}
        colors={["rgb(220 38 38)", "rgb(67 56 202)"]}
      />
    ),
    []
  );

  useEffect(() => {
    const fetchingData = async () => {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("id", id);

      if (error) {
        console.log(error);
        return;
      }
      setEvent(data[0]);
    };

    const fetchInterest = async () => {
      const { data, error } = await supabase
        .from("eventinterest")
        .select("user_id")
        .eq("user_id", user.user?.id)
        .eq("event_id", id);

      if (error) {
        console.error(error);
        return;
      }
      console.log(data);

      if (data.length !== 0) setState(1);
      else setState(0);
    };

    fetchInterest();
    fetchingData();
  }, []);

  if (!event) return <ActivityIndicator />;

  const createInterest = async () => {
    const { error } = await addInterest(user, event.id);
    if (error) {
      console.log(error);
      return;
    }
    setState(1);
    bottomSheetRef.current?.expand();
  };
  const lossOfInterest = async () => {
    const { error } = await onInterestLost(user, event.id);
    if (!error) {
      bottomSheetRef.current?.close();
      setState(0);
    } else {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      <View>
        {event.image && (
          <Image
            style={{
              width: "100%",
              height: 200,
              top: 0,
              left: 0,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
            source={{ uri: event?.image?.url }}
          />
        )}
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            gap: 10,

            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontFamily: "eudoxusbold",
              fontSize: 32,
              color: "rgb(37 99 235)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
              elevation: 10,
            }}
          >
            {event.name}
          </Text>
          <UserId userid={event.creator} />
          <View
            style={{
              gap: 2,
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "eudoxusbold", marginBottom: 10 }}>
              About This Event
            </Text>
            <Text style={styles.secondary}>{event.desc}</Text>
          </View>
          <View
            style={{
              gap: 2,
              padding: 15,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "eudoxusbold", marginBottom: 10 }}>
              Details
            </Text>
            <Text style={styles.date}>
              <Ionicons name="calendar" size={16} />{" "}
              {new Date(event.start).toLocaleDateString()} at{" "}
              {new Date(event.start).getHours() < 10
                ? `0${new Date(event.start).getHours()}`
                : new Date(event.start).getHours()}
              :
              {new Date(event.start).getMinutes() < 10
                ? `0${new Date(event.start).getMinutes()}`
                : new Date(event.start).getMinutes()}{" "}
              {new Date(event.start).getHours() < 12 ? "AM" : "PM"}
            </Text>
            <Text style={styles.date}>
              <Ionicons name="pin-outline" size={16} /> {event.location}
            </Text>
            <Text style={styles.date}>
              <Ionicons name="book" size={16} /> {event.type}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{ padding: 20, position: "absolute", bottom: 40, width: "100%" }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: 48, padding: 3 }}
          onPress={() => {
            state === 1 ? bottomSheetRef.current?.expand() : createInterest();
          }}
        >
          <LinearGradient
            start={{ x: 0.47, y: 0 }}
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
            colors={["rgb(37 99 235)", "rgb(67 56 202)"]}
          >
            <Ionicons
              name={state === 0 ? "person-add" : "pencil"}
              size={15}
              color="#FFF"
            />
            <Text style={{ fontFamily: "eudoxus", color: "#fff" }}>
              {state === 0 ? "I'M INTERESTED" : "EDIT STANDING"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {event.image && (
          <Text style={{ fontFamily: "eudoxus" }}>
            *Photo by {event.image.creator}
          </Text>
        )}
      </View>
      <BottomSheet
        backgroundComponent={backgroundBottomSheet}
        backdropComponent={(props: any) => (
          <BottomSheetBackdrop
            appearsOnIndex={1}
            disappearsOnIndex={-1}
            {...props}
          />
        )}
        //@ts-ignore
        ref={bottomSheetRef}
        backgroundStyle={{ flex: 1 }}
        snapPoints={points}
        index={-1}
        enablePanDownToClose={true}
      >
        <View style={{ padding: 10, gap: 20 }}>
          <Text style={{ color: "#fff", fontFamily: "eudoxus", fontSize: 20 }}>
            Added to your event list!
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 3,
            }}
          >
            <Image
              source={{ uri: event?.image?.url }}
              style={{ width: "100%", height: 52 }}
            />
            <Text style={{ fontFamily: "eudoxus", padding: 8 }}>
              {event.name}
            </Text>
          </View>

          <View style={{ gap: 3.5 }}>
            <TouchableOpacity
              onPress={() => {
                router.dismiss();
                router.push("/connect/Event/EventList");
              }}
              style={{ backgroundColor: "#fff", padding: 10 }}
            >
              <Text style={{ fontFamily: "eudoxus" }}>View Your Events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                open({
                  title: `Are you sure you want to unenroll in ${event.name}`,
                  desc: "You can always rejoin later.",
                  onConfirm() {
                    lossOfInterest();
                  },

                  disengagable: true,
                });
              }}
              style={{ backgroundColor: "#fff", padding: 10 }}
            >
              <Text style={{ fontFamily: "eudoxus" }}>
                Remove from Eventlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.dismiss();
              }}
              style={{ backgroundColor: "#fff", padding: 10 }}
            >
              <Text style={{ fontFamily: "eudoxus" }}>Return to Events</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default EventModal;

const styles = StyleSheet.create({
  secondary: {
    fontSize: 15,
    color: "#8c8c8c",
    fontFamily: "eudoxus",
  },
  date: {
    padding: 3,
    paddingHorizontal: 6,
    backgroundColor: "#dedede",
    alignItems: "center",
    fontSize: 15,
    fontFamily: "eudoxus",
    flexDirection: "row",
    color: "#000",
    borderRadius: 50,
  },
});
