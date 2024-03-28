import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>;
};

export default FormContainer;
