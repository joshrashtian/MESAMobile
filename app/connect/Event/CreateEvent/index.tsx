import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { months, type EventType } from "../../../(components)/EventComponent";
import FormContainer from "./FormContainer";
import FormInput from "../../../(components)/Components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "./DatePicker";
import { useUser } from "../../../(contexts)/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../../../supabase";
import { router } from "expo-router";

const types = [
  {
    type: "User Created",
  },
  {
    type: "Workshop",
  },
  {
    type: "Official MESA",
    permissions: ["admin"],
  },
  {
    type: "Tutoring",
    permissions: ["admin", "tutor", "moderator"],
  },
];

const CreateEvent = () => {
  const { data, user } = useUser();
  const [eventDetails, setEventDetails] = useState<EventType>();
  const [date, setDate] = useState<{
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    hasEnd: boolean;
  }>();
  const [tags, setTags] = useState([]);
  const [type, setType] = useState();

  return (
    <KeyboardAwareScrollView
      style={{ margin: 15, flex: 1, height: "100%", flexDirection: "column" }}
    >
      <FormInput
        placeholder="Give your event a name..."
        onChangeText={(e: string) => {
          // @ts-ignore
          setEventDetails({ ...eventDetails, name: e });
        }}
      />
      <FormInput
        placeholder="Give your event a description..."
        multiline
        cursorColor={"#A00"}
        onChangeText={(e: string) => {
          // @ts-ignore
          setEventDetails({ ...eventDetails, desc: e });
        }}
      />
      <FormInput
        placeholder="Location..."
        multiline
        cursorColor={"#A00"}
        onChangeText={(e: string) => {
          // @ts-ignore
          setEventDetails({ ...eventDetails, location: e });
        }}
      />
      <DatePicker
        changeDate={(e) => {
          setDate(e);
          console.log("recieved", e);
        }}
      />
      <Text
        style={{
          fontFamily: "eudoxus",
          fontSize: 24,
          color: "#830",
        }}
      >
        {date?.startDate &&
          `On ${
            months[date.startDate.getMonth()]
          } ${date.startDate.getDate()}, at ${date.startDate.getHours()}:${
            date.startDate.getMinutes() < 10
              ? `0${date.startDate.getMinutes()}`
              : date.startDate.getMinutes()
          } `}{" "}
        {date?.endDate &&
          `and ending at ${
            months[date.endDate.getMonth()]
          } ${date.endDate.getDate()}, at ${date.endDate.getHours()}:${
            date.endDate.getMinutes() < 10
              ? `0${date.endDate.getMinutes()}`
              : date.endDate.getMinutes()
          }`}
        .
      </Text>
      <FlatList
        data={types}
        horizontal
        style={{ marginVertical: 10 }}
        renderItem={({ item }) => {
          //@ts-ignore
          if (item.permissions && !item.permissions.includes(data.role))
            return null;

          return (
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                setEventDetails({ ...eventDetails, type: item.type });
              }}
              style={{
                padding: 10,
                marginHorizontal: 4,
                borderRadius: 10,
                backgroundColor:
                  item.type === eventDetails?.type ? "#ff5C1f" : "#E23C1D",
              }}
            >
              <Text style={{ color: "#fff" }}>{item.type}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ flexDirection: "row", gap: 5 }}>
        {tags?.map((e) => (
          <Text
            style={{ fontFamily: "mono", padding: 3, backgroundColor: "#ddd" }}
          >
            {e}
          </Text>
        ))}
      </View>
      <FormInput
        placeholder="Add Some Tags..."
        onChangeText={(e: string) => setTags(e.split(", "))}
        style={{ marginBottom: 10 }}
      />
      <Pressable
        onPress={async () => {
          console.log("has been tapped");
          const { error } = await supabase.from("events").insert({
            name: eventDetails?.name,
            desc: eventDetails?.desc,
            type: eventDetails?.type,
            start: date?.startDate,
            end: date?.endTime,
            location: eventDetails?.location,
            tags: tags,
            creator: user?.id,
          });
          if (error) {
            alert(error.message);
          } else {
            router.dismiss();
          }
        }}
        style={{ width: "100%", height: 32 }}
      >
        <LinearGradient
          start={{ x: 0.47, y: 0 }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 2,
            width: "100%",
            height: "100%",
          }}
          colors={["rgb(37 99 235)", "rgb(67 56 202)"]}
        >
          <Text
            style={{
              fontFamily: "eudoxus",
              fontSize: 20,
              color: "#fff",
            }}
          >
            Create Event
          </Text>
        </LinearGradient>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const style = StyleSheet.create({
  input: {
    padding: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontFamily: "eudoxus",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default CreateEvent;
