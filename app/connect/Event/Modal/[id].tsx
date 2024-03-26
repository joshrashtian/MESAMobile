import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
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
import { addInterest, onInterestLost } from "../EventInterests";

const EventModal = () => {
  const [event, setEvent] = useState<EventType>();
  const [state, setState] = useState<number>(1);
  const { id } = useLocalSearchParams();
  const points = useMemo(() => ["30%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>();
  const user = useUser();
  const router = useRouter();

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
        .select()
        .eq("user_id", user.user.id)
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
      router.dismissAll();
    } else {
      console.log(error);
    }
  };

  return (
    <View
      style={{ justifyContent: "space-between", flex: 1, paddingBottom: 30 }}
    >
      <View>
        {event.image && (
          <Image
            style={{
              width: "100%",
              height: "40%",
              top: 0,
              left: 0,
            }}
            src={event?.image?.url}
          />
        )}
        <View style={{ padding: 20, gap: 10, flexDirection: "column" }}>
          <Text style={{ fontFamily: "eudoxus", fontSize: 32 }}>
            {event.name}
          </Text>
          <Text style={styles.secondary}>{event.desc}</Text>
          <Text style={styles.date}>
            🕰️ {new Date(event.start).toLocaleDateString()} at{" "}
            {new Date(event.start).getHours() < 10
              ? `0${new Date(event.start).getHours()}`
              : new Date(event.start).getHours()}
            :
            {new Date(event.start).getMinutes() < 10
              ? `0${new Date(event.start).getMinutes()}`
              : new Date(event.start).getMinutes()}
          </Text>
          <Text style={styles.date}>📍 {event.location}</Text>
        </View>
      </View>
      <View style={{ padding: 20 }}>
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
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 2,
            }}
            colors={["rgb(37 99 235)", "rgb(67 56 202)"]}
          >
            <Text style={{ fontFamily: "eudoxus", color: "#fff" }}>
              {state === 0 ? "I'M INTERESTED" : "VIEW DETAILS"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
              src={event?.image?.url}
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
                lossOfInterest();
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
    fontSize: 20,
    color: "#8c8c8c",
  },
  date: {
    padding: 3,
    paddingHorizontal: 6,
    backgroundColor: "#eee",
    fontSize: 20,
    fontFamily: "mono",
    color: "#000",
  },
});
