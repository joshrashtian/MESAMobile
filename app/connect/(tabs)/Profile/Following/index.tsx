import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { UserData, useUser } from "../../../../(contexts)/AuthContext";
import { supabase } from "../../../../../supabase";
import FollowComponent from "./FollowComponent";

const index = () => {
  const { user } = useUser();
  const [following, setFollowing] = useState();
  const [refreshing, setRefreshing] = useState(true);

  async function get() {
    const { data, error } = await supabase.rpc("get_followers_by_user", {
      userid: user?.id,
    });

    if (error) {
      alert(error.message);
      return;
    }
    setRefreshing(false);
    setFollowing(data);
  }

  useEffect(() => {
    get();
  }, []);

  const getNew = useCallback(() => {
    get();
  }, []);

  return (
    <View style={styles.core}>
      {following ? (
        <FlatList
          data={following}
          ListHeaderComponent={
            <Text
              style={{ fontFamily: "eudoxus", fontSize: 24, marginBottom: 10 }}
            >
              Following
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getNew} />
          }
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => <FollowComponent user={item} />}
        />
      ) : (
        <Text>You currently are not following anybody.</Text>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    padding: 20,
  },
});
