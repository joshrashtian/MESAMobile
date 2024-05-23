
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import Polls from "./Polls";

const LearningHome = () => {
    return (
      <View style={styles.container}>
          <Pressable>
            <LinearGradient colors={["#fb923c", "#f87171"]} style={styles.button}>
                <Ionicons name={"map"} color="#fff" size={23} />
                <Text style={{ fontFamily: 'eudoxus', color: "#fff", fontSize: 18 }}>Study Questions</Text>
            </LinearGradient>
          </Pressable>
          <Pressable>
              <LinearGradient  start={{ x: 0.46, y: 0.1}} colors={["#6366f1", "#0ea5e9"]} style={styles.button}>
                  <Ionicons name="person" color="#fff" size={23} />
                  <Text style={{ fontFamily: 'eudoxus', color: "#fff", fontSize: 18 }}>Your Learning Profile</Text>
              </LinearGradient>
          </Pressable>
          <Polls />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 3,
      padding: 10,
    },
    button: {
        width: "100%",
        padding: 30,
        paddingVertical: 20,
        borderRadius: 10,

    }
})

export default LearningHome;