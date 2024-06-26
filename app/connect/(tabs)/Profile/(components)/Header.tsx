import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserData } from "../../../../(contexts)/AuthContext";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";

const Header = ({
  user,
  visibility = true,
}: {
  user: UserData;
  visibility: boolean;
}) => {
  return (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Image
          src={user?.avatar_url}
          style={{
            width: 64,
            borderRadius: 200,
            height: 64,
          }}
        />
        <View>
          <Text style={{ fontFamily: "eudoxus", fontSize: 26 }}>
            {user?.real_name}
          </Text>
          <Text style={{ fontFamily: "eudoxus", fontSize: 20, color: "#888" }}>
            @{user?.username}
          </Text>
        </View>
      </View>
      {visibility && (
        <Animated.View
          entering={FadeInUp.delay(100).duration(300).springify()}
          style={{
            padding: 20,

            backgroundColor: "#fff",
            borderRadius: 10,

            gap: 20,
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <FontAwesome6 name="ranking-star" size={18} />
              <Text
                style={{ fontFamily: "eudoxus", textTransform: "capitalize" }}
              >
                {user.role}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <FontAwesome name="address-card" color="#065" size={18} />
              <Text style={{ fontFamily: "eudoxus", color: "#065" }}>
                {user.major ? user.major : "Undecided"}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Ionicons name="time" size={18} color="#888" />
              <Text
                style={{
                  fontFamily: "eudoxus",
                  alignItems: "center",
                  color: "#888",
                }}
              >
                Joined {new Date(user.created_at).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
