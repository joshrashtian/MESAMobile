import React from "react";
import { View, Text } from "react-native";
import { useUser } from "../../(contexts)/AuthContext";
import { TouchableOpacity } from "react-native";

const Settings = () => {
  const user = useUser();
  return (
    <View>
      <Text>Hello, world!</Text>

      <TouchableOpacity
        onPress={() => {
          user.signOut();
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
