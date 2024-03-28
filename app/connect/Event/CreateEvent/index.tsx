import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { type EventType } from "../../../(components)/EventComponent";
const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState<EventType>();

  return (
    <View>
      <TextInput />
    </View>
  );
};

export default CreateEvent;
