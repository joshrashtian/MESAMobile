import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useUser } from "../../(contexts)/AuthContext";
import Header from "./(components)/Header";
import Loading from "../../Loading";

const PersonalProfile = () => {
  const { data } = useUser();

  if (!data) return <Loading />;
  return (
    <View style={styles.core}>
      <ScrollView>
        <Header visibility={true} user={data} />
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
