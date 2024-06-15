import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { UserData } from "../../../(contexts)/AuthContext";
import { router } from "expo-router";
import { Image } from "expo-image";

const FollowComponent = (Props: { user: UserData }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/connect/Profile/Profile/${Props.user.id}`)}
      style={{
        padding: 15,
        backgroundColor: "#fff",
        width: "100%",
        borderRadius: 10,
        shadowColor: "#888",
        marginBottom: 10,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        gap: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={{ uri: Props.user.avatar_url }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
        }}
      />
      <View>
        <Text style={{ fontFamily: "eudoxus", textAlign: "right" }}>
          {Props.user.real_name}
        </Text>
        <Text style={{ fontFamily: "eudoxus", textAlign: "right" }}>
          @{Props.user.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FollowComponent;
