import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { useUser } from "../../(contexts)/AuthContext";
import Header from "./(components)/Header";
import Loading from "../../Loading";
import { LinearGradient } from "expo-linear-gradient";
import RecentPostsProfile from "./Details/RecentPosts";
import { router } from "expo-router";
import Bio from "./(components)/Bio";
import SetBio from "./(components)/SetBio";

const PersonalProfile = () => {
  const { data } = useUser();

  if (!data) return <Loading />;
  return (
    <View style={styles.core}>
      <ScrollView>
        <Header user={data} visibility={true} />
        <Pressable onPress={() => router.push("/connect/Profile/Following")}>
          <LinearGradient
            style={{
              width: "100%",
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            start={{ x: 0.49, y: 0 }}
            colors={["#23F", "#56F"]}
          >
            <Text style={{ fontFamily: "eudoxus", color: "#FFF" }}>
              View Following
            </Text>
          </LinearGradient>
        </Pressable>
        <SetBio user={data} />
        <RecentPostsProfile id={data.id} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  core: {
    padding: 20,
    flex: 1,
  },
});
export default PersonalProfile;
