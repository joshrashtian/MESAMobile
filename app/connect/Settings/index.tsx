import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useUser } from "../../(contexts)/AuthContext";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDialog } from "../../(contexts)/DialogBox";

const Settings = () => {
  const user = useUser();
  const { open, close } = useDialog();
  return (
    <View style={{ padding: 20, gap: 3 }}>
      <Text style={{ fontFamily: "eudoxusbold" }}>About Account</Text>
      <TouchableOpacity
        onPress={() => {
          open({
            title: "Are You Sure You Would Like To Sign Out?",
            desc: `You may always sign back in using ${user.user?.email}.`,
            disengagable: true,
            onConfirm: () => {
              user.signOut();
            },
          });
        }}
        style={{
          padding: 10,
          backgroundColor: "#a55",
          borderRadius: 6,
        }}
      >
        <Ionicons size={16} color="#fff" name="person-remove" />
        <Text style={{ color: "#fff", fontFamily: "eudoxusbold" }}>
          Sign Out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          open({
            title: "Delete Account",
            desc: "Are you sure you want to delete your account?",
            disengagable: true,
            customComponent: (
              <TouchableOpacity
                onPress={() => {
                  console.log("Pressed!");
                  close({
                    onClose: () => {
                      console.log("Closed!");
                    },
                  });
                }}
              >
                <Text>Okay</Text>
              </TouchableOpacity>
            ),
          });
        }}
        style={{
          padding: 10,
          backgroundColor: "#f44",
          borderRadius: 6,
        }}
      >
        <Ionicons size={16} color="#fff" name="trash" />
        <Text style={{ color: "#fff", fontFamily: "eudoxusbold" }}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
