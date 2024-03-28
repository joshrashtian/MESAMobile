import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserData } from "../../../(contexts)/AuthContext";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

const Header = ({ user }: { user: UserData }) => {
  console.log(user.created_at);
  return (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Image src={user?.avatar_url} />
        <View>
          <Text style={{ fontFamily: "eudoxus", fontSize: 26 }}>
            {user?.real_name}
          </Text>
          <Text style={{ fontFamily: "eudoxus", fontSize: 20, color: "#888" }}>
            @{user?.username}
          </Text>
        </View>
      </View>
      <Animated.View
        entering={FadeInUp.delay(100).duration(300).springify()}
        style={{
          padding: 16,

          backgroundColor: "#fff",
          borderRadius: 10,

          gap: 10,
          shadowColor: "#888",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <Text style={{ fontFamily: "eudoxus" }}>General Information</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "eudoxus", textTransform: "capitalize" }}>
            {user.role}
          </Text>
          <Text style={{ fontFamily: "eudoxus", color: "#065" }}>
            {user.major ? user.major : "Undecided"}
          </Text>
          <Text style={{ fontFamily: "eudoxus", color: "#888" }}>
            Joined {new Date(user.created_at).toLocaleDateString()}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
