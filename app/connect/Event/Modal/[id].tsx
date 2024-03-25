import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams } from "expo-router";
import { EventType } from "../../../(components)/EventComponent";
import { supabase } from "../../../../supabase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../../(contexts)/AuthContext";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";

const EventModal = () => {
  const [event, setEvent] = useState<EventType>();
  const { id } = useLocalSearchParams();
  const points = useMemo(() => ["30%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>();
  const user = useUser();

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
    fetchingData();
  }, []);

  if (!event) return <ActivityIndicator />;

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
            src={event.image.url}
          />
        )}
        <View style={{ padding: 20, gap: 10, flexDirection: "column" }}>
          <Text style={{ fontFamily: "eudoxus", fontSize: 32 }}>
            {event.name}
          </Text>
          <Text style={styles.secondary}>{event.desc}</Text>
          <Text style={styles.date}>
            🕰️ {new Date(event.start).getMonth()}/
            {new Date(event.start).getDay()}/
            {new Date(event.start).getFullYear()} at{" "}
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
            bottomSheetRef.current?.expand();
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
              I'M INTERESTED
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
        <View style={{ padding: 10 }}>
          <Text style={{ color: "#fff", fontFamily: "eudoxus", fontSize: 20 }}>
            Added {event.name} to your event list!
          </Text>
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
