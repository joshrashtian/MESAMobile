import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const FormContainer = (props: any) => {
  return <KeyboardAwareScrollView {...props} >{props.children}</KeyboardAwareScrollView>;
};

export default FormContainer;
