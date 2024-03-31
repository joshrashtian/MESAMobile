import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../supabase";
import {Ionicons} from "@expo/vector-icons";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const SignInUser = async () => {
    if (!email || !password) {
      setError("Please error all fields!");
      return;
    }

    const { error: SignInFault } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    });

    console.log(SignInFault?.message);
    setError(SignInFault?.message);
  };

  return (
    <View style={styles.core}>
      <LinearGradient colors={["#eee", "#ddd"]} style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", fontFamily: 'eudoxus' }}>
          Let's Get You Connected.
        </Text>
        <View>
        {
        error &&
          <Pressable onPress={() => {setError(undefined)}}>
          <LinearGradient style={styles.error} colors={["#a00", "#e00"]}>
            <Animated.Text entering={FadeIn} exiting={FadeOut} style={{color: "#fff", zIndex: 1, fontFamily: 'eudoxus'}}>{error}</Animated.Text>
          </LinearGradient>
          </Pressable>
        }
        <LinearGradient
          colors={["#ddd", '#ddd']}
          start={{ x: 0.497, y: 0 }}
          style={styles.inputContainer}
        >
          <Ionicons name="person" color={"#a00"} size={16} />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setEmail(e);
            }}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
          />
        </LinearGradient>
        <LinearGradient
          colors={["#ddd", '#ddd']}
          start={{ x: 0.497, y: 0 }}
          style={styles.inputContainer}
        >
          <Ionicons name="key" color={"#a00"} size={16} />
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setPassword(e);
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoComplete="current-password"
          />
        </LinearGradient>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            SignInUser();
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>

      </LinearGradient>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  core: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#E65C4C",

  },
  container: {
    padding: 16,
    height: "70%",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 20,
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 2,
    width: "100%",
    color: "#ba2b1a",
  },
  inputContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 0},
    shadowColor: '#ccc',
    shadowOpacity: 0.7,
    shadowRadius: 1,
    width: "100%",
    marginVertical: 4,
    flexDirection: "row",
    alignItems: 'center',
  },
  button: {},
  error: {
    padding: 10,
    borderRadius: 10
  }
});
