import { PostType } from "./Post";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Wim = ({ post }: { post: PostType }) => {
  const data = JSON.parse(JSON.stringify(post.data)).data;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      colors={["#dff", "#dee"]}
      style={{
        width: "100%",
        borderRadius: 8,
        padding: 14,
        marginBottom: 6,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "eudoxus" }}>{post.creator.name}</Text>
        <Text style={{ fontFamily: "eudoxus" }}>
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Text>{post.data.data.text}</Text>
    </LinearGradient>
  );
};

export default Wim;

const styles = StyleSheet.create({});
