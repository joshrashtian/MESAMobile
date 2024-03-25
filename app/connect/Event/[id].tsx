import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { EventType } from "../../(components)/EventComponent";
import { supabase } from "../../../supabase";

const EventModal = () => {
  const [event, setEvent] = useState<EventType>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchingData = async () => {
      const { data, error } = await supabase
        .from("posts")
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
    <View>
      <Text>EventModal</Text>
    </View>
  );
};

export default EventModal;

const styles = StyleSheet.create({});
