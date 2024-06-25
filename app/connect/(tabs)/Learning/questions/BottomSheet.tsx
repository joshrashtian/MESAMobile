import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PollType } from "../Polls";
const BottomSheetComp = ({
  refrence,
  index,
  submit,
}: {
  refrence: any;
  index: number;
  submit: (e: PollType | null) => void;
}) => {
  const points = useMemo(() => ["30%", "50%"], []);
  const [filter, setFilter] = useState<PollType>();
  const backgroundBottomSheet = useCallback(
    (props: any) => (
      <LinearGradient
        {...props}
        locations={[0, 0.49]}
        colors={["#349ACB", "#5CAED6"]}
      />
    ),
    []
  );

  return (
    <BottomSheet
      enablePanDownToClose={true}
      snapPoints={points}
      backgroundComponent={backgroundBottomSheet}
      backdropComponent={(props: any) => (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      index={index}
      ref={refrence}
    >
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "eudoxus", fontSize: 24, color: "#fff" }}>
          Filters
        </Text>
        <View style={{ gap: 3.5, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              submit(null);
              refrence.current?.close();
            }}
            style={{
              backgroundColor: "#fff",
              width: "49%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontFamily: "eudoxus" }}>Clear Filters</Text>
            <Ionicons size={16} name="close" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              width: "49%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
            onPress={() => {
              //@ts-ignore
              submit(filter);
              refrence.current?.close();
            }}
          >
            <Text style={{ fontFamily: "eudoxus" }}>Apply Filters</Text>
            <Ionicons size={16} name="clipboard" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetComp;
