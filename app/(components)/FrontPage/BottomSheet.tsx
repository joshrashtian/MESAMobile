import { View, Text, Dimensions } from "react-native";
import React, { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import RecentNews from "./RecentNews";
import MenuButton from "../Components/MenuButton";

const NewBottomSheet = () => {
  const points = useMemo(() => ["22%", "33%", "52%"], []);
  return (
    <BottomSheet
      snapPoints={points}
      handleIndicatorStyle={{
        backgroundColor: "#ddd",
        width: 25,
      }}
      handleStyle={{
        backgroundColor: "#000",
        marginBottom: 10,
      }}
      handleComponent={() => (
        <>
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: 50,
              backgroundColor: "#000",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 15,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "#E65C4F",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#ddd",
                width: 30,
                borderRadius: 10,
                height: 4,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 15,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                backgroundColor: "#FFF",
              }}
            />
          </View>
        </>
      )}
      index={1}
    >
      <View>
        <View
          style={{
            height: 50,
            width: "100%",
            padding: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <RecentNews />
        </View>
        <View
          style={{
            height: 50,
            width: Dimensions.get("screen").width,
            padding: 2,
            flexDirection: "row",
            gap: 3,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <MenuButton link={"/connect/Social/"} title="Social" icon="people" />
          <MenuButton
            link={"/connect/Event/ForYouEvents/"}
            title="Events For You"
            icon="calendar"
          />
        </View>
        <View style={{ margin: 20 }}>
          <Text>Other Features</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default NewBottomSheet;
