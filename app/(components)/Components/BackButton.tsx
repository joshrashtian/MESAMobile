import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        justifyContent: "center",
        alignContent: "center",
      }}
      onPress={() => {
        router.replace("/connect/Event/");
      }}
    >
      <Ionicons name="chevron-back" size={16} color="#500" />
    </TouchableOpacity>
  );
};

export default BackButton;
