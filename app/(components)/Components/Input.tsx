import { TextInput, type TextInputProps } from "react-native";

const FormInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[
        {
          padding: 8,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          fontFamily: "eudoxus",
          fontSize: 16,

          borderWidth: 1,
          marginVertical: 6,
          borderColor: "#ccc",
        },
        props.style,
      ]}
    />
  );
};

export default FormInput;
