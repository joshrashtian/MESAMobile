import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { useUser } from "../../../(contexts)/AuthContext";
import Header from "./(components)/Header";
import Loading from "../../../Loading";
import { LinearGradient } from "expo-linear-gradient";
import RecentPostsProfile from "./Details/RecentPosts";
import { router } from "expo-router";
import Bio from "./(components)/Bio";
import SetBio from "./(components)/SetBio";
import { Ionicons } from "@expo/vector-icons";
import SettingsComp from "./(components)/SettingsComp";

const PersonalProfile = () => {
  const { data } = useUser();

  if (!data) return <Loading />;
  return (
    <View style={styles.core}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header user={data} visibility={true} />
        <SettingsComp />
        <SetBio user={data} />
        <RecentPostsProfile id={data.id} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  core: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
export default PersonalProfile;
