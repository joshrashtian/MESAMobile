import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { months, type EventType } from "../../../(components)/EventComponent";
import FormContainer from "./FormContainer";
import FormInput from "../../../(components)/Components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "./DatePicker";
import { useUser } from "../../../(contexts)/AuthContext";

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
  const { data } = useUser();
  const [eventDetails, setEventDetails] = useState<EventType>();
  const [date, setDate] = useState<{
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    hasEnd: boolean;
  }>();

  return (
    <KeyboardAwareScrollView
      style={{ padding: 20, flex: 1, flexDirection: "column" }}
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
      <Text
        style={{
          fontFamily: "mono",
          fontSize: 28,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Types
      </Text>
      <FlatList
        data={types}
        horizontal
        renderItem={({ item }) => {
          //@ts-ignore
          if (item.permissions && !item.permissions.includes(data.role))
            return null;

          return (
            <TouchableOpacity
              onPress={(e) => {
                // @ts-ignore
                setEventDetails({ ...eventDetails, type: e });
              }}
              style={{
                padding: 10,
                marginHorizontal: 4,
                borderRadius: 10,
                backgroundColor: "#E23C1D",
              }}
            >
              <Text style={{ color: "#fff" }}>{item.type}</Text>
            </TouchableOpacity>
          );
        }}
      />
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
