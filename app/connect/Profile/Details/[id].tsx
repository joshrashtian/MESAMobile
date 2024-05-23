import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../(components)/Header";
import { supabase } from "../../../../supabase";
import Loading from "../../../Loading";
import { UserData } from "../../../(contexts)/AuthContext";

const Profile = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<UserData>();
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };

  if (!data) return <Loading />;

  return (
    <View style={styles.core}>
      <ScrollView>
        <Header user={data} visibility={true} />
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

export default Profile;
