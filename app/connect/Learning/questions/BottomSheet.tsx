import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
const BottomSheetComp = ({
  refrence,
  index,
}: {
  refrence: any;
  index: number;
}) => {
  const points = useMemo(() => ["30%", "50%"], []);
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
            onPress={() => {}}
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
            onPress={() => {}}
            style={{
              backgroundColor: "#fff",
              width: "49%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
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
