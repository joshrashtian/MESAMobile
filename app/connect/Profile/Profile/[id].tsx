import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { UserData, useUser } from "../../../(contexts)/AuthContext";
import Header from "../(components)/Header";
import Loading from "../../../Loading";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../../supabase";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  const [data, setData] = useState<UserData>();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchingData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
        return;
      }
      setData(data);
    };
    fetchingData();
  }, []);

  if (!data) return <Loading />;
  return (
    <View style={styles.core}>
      <ScrollView>
        <Header user={data} />
        <View>
          <Pressable style={styles.followbutton}>
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
                Follow
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  core: {
    paddingHorizontal: 20,
    flex: 1,
  },
  followbutton: {
    padding: 10,
  },
});
export default ProfileScreen;
