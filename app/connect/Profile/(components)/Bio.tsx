import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { UserData } from "../../../(contexts)/AuthContext";

const Bio = ({ user }: { user: UserData }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(300).duration(300).springify()}
      style={{
        padding: 20,

        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        gap: 20,
        shadowColor: "#888",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}
    >
      <Text>Temp</Text>
    </Animated.View>
  );
};

export default Bio;
