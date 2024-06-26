import { TextInput } from "react-native";

const FormInput = (props: any) => {
  return (
    <TextInput
      {...props}
      style={{
        padding: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        fontFamily: "eudoxus",
        fontSize: 16,
        shadowColor: "#aaa",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 1,
        shadowOpacity: 1,
        borderWidth: 1,
        marginVertical: 6,
        borderColor: "#ccc",
      }}
    />
  );
};

export default FormInput;
