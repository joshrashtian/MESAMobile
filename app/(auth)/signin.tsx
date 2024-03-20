import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../../supabase";

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
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Let's Get You Connected.
        </Text>
        <LinearGradient
          colors={["#dcc", "#ccc"]}
          start={{ x: 0.497, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setEmail(e);
            }}
          />
        </LinearGradient>
        <LinearGradient
          colors={["#ddd", "#dcc"]}
          start={{ x: 0.497, y: 0 }}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setPassword(e);
            }}
          />
        </LinearGradient>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            SignInUser();
          }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <Text>{error}</Text>
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
  },
  input: {
    padding: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 2,
    width: "100%",
    color: "#ba2b1a",
    textAlign: "center",
  },
  inputContainer: {
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: "100%",
    marginVertical: 4,
  },
  button: {},
});
