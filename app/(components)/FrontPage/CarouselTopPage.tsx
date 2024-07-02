import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import UpcomingEvent from "./UpcomingEvent";
import { Ionicons } from "@expo/vector-icons";

const CarouselTopPage = () => {
  const components = [<UpcomingEvent />];
  return (
    <>
      <Ionicons
        name="information-circle"
        style={{ marginLeft: 6 }}
        size={27}
        color="#Fff"
      />

      <Text
        style={{
          color: "#FFF",
          alignItems: "center",
          fontFamily: "eudoxus",
          fontSize: 16,
          marginLeft: 10,
          marginBottom: 10,
        }}
      >
        Your Information
      </Text>
      <FlatList
        data={components}
        horizontal
        ListEmptyComponent={<Text>Currently, we have nada information.</Text>}
        showsHorizontalScrollIndicator={false}
        centerContent={true}
        pagingEnabled
        renderItem={({ item }) => (
          <View
            style={{
              width: Dimensions.get("screen").width - 40,
              height: 160,
              marginHorizontal: 10,
            }}
          >
            {item}
          </View>
        )}
      />
    </>
  );
};

export default CarouselTopPage;

const styles = StyleSheet.create({});
