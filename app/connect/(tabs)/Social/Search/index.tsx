import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Post, { PostType } from "../../../../(components)/Post";
import EventComponent, {
  EventType,
} from "../../../../(components)/EventComponent";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import Wim from "../../../../(components)/Wim";
import { MaterialIcons } from "@expo/vector-icons";
import { Search } from "./search";

const SearchPage = () => {
  const [text, setText] = useState<string>();
  const [data, setData] = useState<any>([]);
  const [type, setType] = useState<string>("posts");
  const [current, setCurrent] = useState<string>("posts");

  return (
    <View style={styles.core}>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="What to learn today?"
          onChangeText={(e) => setText(e)}
        />
        {text && (
          <Animated.View
            style={{ zIndex: 10 }}
            entering={FadeInDown.springify()}
            exiting={FadeOutUp}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#f55",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={async () => {
                const { data, error } = await Search(type, text);
                setData(data);
                setCurrent(type);
              }}
            >
              <MaterialIcons color="#fff" name="search" size={24} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 10, margin: 10 }}>
        {["posts", "events"].map((e) => (
          <Animated.View
            style={{
              zIndex: 10,
              backgroundColor:
                type === e ? (e === current ? "#e00" : "#e77") : "#ccc",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            entering={FadeInDown.springify()}
            exiting={FadeOutUp}
          >
            <TouchableOpacity
              onPress={() => {
                setType(e);
              }}
            >
              <Text
                style={{
                  textTransform: "capitalize",
                  color: "#fff",
                  fontFamily: "eudoxus",
                }}
              >
                {e}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => <Text>No Results Match</Text>}
        //@ts-ignore
        renderItem={(result) => {
          if (current === "posts") {
            switch (result.item.type) {
              case "post":
                return (
                  <Animated.View entering={FadeInUp}>
                    <Post post={result.item} />
                  </Animated.View>
                );
              default:
                return null;
            }
          }
          if (current === "events") {
            if (!result.item.start) return;
            return (
              <Animated.View
                style={{ alignSelf: "center", padding: 2 }}
                entering={FadeInUp}
              >
                <EventComponent
                  color={"rgba(300,200,200,0.3)"}
                  event={result.item}
                />
              </Animated.View>
            );
          }
        }}
        style={{ zIndex: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  core: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    fontFamily: "eudoxus",
    fontSize: 20,
    width: "80%",
  },
});
export default SearchPage;
