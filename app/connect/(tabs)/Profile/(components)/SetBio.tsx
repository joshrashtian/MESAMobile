import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Bio from "./Bio";
import { UserData } from "../../../../(contexts)/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../../../../supabase";

const SetBio = (Props: { user: UserData }) => {
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState<string | undefined>(Props.user.bio);

  const AnimateTouch = Animated.createAnimatedComponent(TouchableOpacity);

  if (!edit)
    return (
      <AnimateTouch
        onPress={() => setEdit(true)}
        entering={FadeInUp.delay(300).duration(300).springify()}
        exiting={FadeOutUp.delay(300).duration(300).springify()}
      >
        <Bio user={Props.user} />
        <Ionicons
          style={{
            position: "absolute",
            transform: [{ translateY: 16 }, { translateX: 8 }],
          }}
          name="pencil"
        />
      </AnimateTouch>
    );
  else
    return (
      <Animated.View
        entering={FadeInUp.delay(300).duration(300).springify()}
        exiting={FadeOutUp.delay(300).duration(300).springify()}
        style={{
          padding: 20,

          backgroundColor: "#fff",
          borderRadius: 10,
          marginVertical: 10,
          gap: 20,
          shadowColor: "#888",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <LinearGradient
          colors={["#ddd", "#ddd"]}
          start={{ x: 0.497, y: 0 }}
          style={styles.inputContainer}
        >
          <Ionicons name="pencil" color={"#a00"} size={16} />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setBio(e);
            }}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            multiline
            value={bio}
          />
        </LinearGradient>
        {bio && (
          <Pressable
            onPress={async () => {
              const { error } = await supabase
                .from("profiles")
                .update({
                  bio,
                })
                .eq("id", Props.user.id);
              if (error) {
                console.log(error);
              } else {
                setEdit(false);
              }
            }}
          >
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
                Submit
              </Text>
            </LinearGradient>
          </Pressable>
        )}
      </Animated.View>
    );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    paddingLeft: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#444",
    shadowOpacity: 0.7,
    shadowRadius: 1,
    width: "100%",
    color: "#ba2b1a",
    fontFamily: "eudoxus",
    fontSize: 16,
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#ccc",
    shadowOpacity: 0.7,
    shadowRadius: 1,
    width: "100%",
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SetBio;
