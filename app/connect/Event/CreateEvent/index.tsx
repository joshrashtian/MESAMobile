import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import { type EventType } from "../../../(components)/EventComponent";
import FormContainer from "./FormContainer";
import FormInput from "../../../(components)/Components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "./DatePicker";
const CreateEvent = () => {
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
      <Text>
        {date?.startDate?.toLocaleString()} {date?.endDate?.toLocaleString()}
      </Text>
      <FlatList
        data={["Personal"]}
        horizontal
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
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
