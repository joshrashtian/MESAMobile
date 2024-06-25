import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const DatePicker = ({ changeDate }: { changeDate: (e: any) => void }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endDate, setendDate] = useState<Date>(new Date());
  const [endTime, setendTime] = useState<Date>(new Date());
  const [hasEnd, setHasEnd] = useState<boolean>(false);

  const handleDateChange = async (date: DateTimePickerEvent, index: number) => {
    switch (index) {
      case 1:
        setStartDate(new Date(date.nativeEvent.timestamp));
        break;
      case 2:
        setStartTime(new Date(date.nativeEvent.timestamp));
        break;
      case 3:
        setendDate(new Date(date.nativeEvent.timestamp));
        break;
      case 4:
        setendTime(new Date(date.nativeEvent.timestamp));
        setHasEnd(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(
      `${startDate.toISOString().split("T")[0]}T${
        startTime.toISOString().split("T")[1]
      }`
    );
    changeDate({
      startDate: new Date(
        startDate.setHours(startTime.getHours(), startTime.getMinutes())
      ),
      endDate: hasEnd
        ? new Date(endDate.setHours(endTime.getHours(), endTime.getMinutes()))
        : null,
      hasEnd: hasEnd,
    });
  }, [startDate, endDate, startTime, endTime]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          padding: 10,
          gap: 10,
          backgroundColor: "#eee",
        }}
      >
        <Text>Start Date</Text>
        <DateTimePicker
          mode="date"
          minimumDate={new Date(Date.now())}
          display="clock"
          value={startDate}
          onChange={(e: DateTimePickerEvent) => handleDateChange(e, 1)}
        />
        <DateTimePicker
          mode="time"
          minimumDate={new Date(Date.now())}
          display="clock"
          value={startTime}
          onChange={(e: DateTimePickerEvent) => handleDateChange(e, 2)}
        />
      </View>
      {hasEnd ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            padding: 10,
            gap: 10,
            backgroundColor: "#eee",
          }}
        >
          <Text>End Date</Text>
          <DateTimePicker
            mode="date"
            minimumDate={startDate}
            display="clock"
            value={endDate}
            onChange={(e: DateTimePickerEvent) => handleDateChange(e, 3)}
          />
          <DateTimePicker
            mode="time"
            display="clock"
            minimumDate={startTime}
            onChange={(e: DateTimePickerEvent) => handleDateChange(e, 4)}
            value={endTime}
          />
        </View>
      ) : (
        <Pressable
          onPress={() => {
            setHasEnd(true);
          }}
        >
          <LinearGradient
            colors={["#eee", "#eedede"]}
            start={{ x: 0.46, y: 0 }}
            style={{ padding: 13, borderRadius: 20 }}
          >
            <Text style={{ fontFamily: "eudoxus" }}>Create End Time</Text>
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
};

export default DatePicker;
