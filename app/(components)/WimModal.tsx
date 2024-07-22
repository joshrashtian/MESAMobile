import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import FormInput from "./Components/Input";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../supabase";
import { useUser } from "../(contexts)/AuthContext";
import { useDialog } from "../(contexts)/DialogBox";
import Animated from "react-native-reanimated";
import MenuButton from "./Components/MenuButton";

const WimModal = () => {
  const [wim, setWim] = useState<string>();
  const { data } = useUser();
  const { close } = useDialog();

  async function postWim() {
    if (!wim) {
      alert("Please enter a message!");
      return;
    }
    const { error } = await supabase.from("posts").insert({
      userid: data?.id,
      data: {
        data: {
          type: "wim",
          text: wim,
        },
      },
      creator: {
        id: data?.id,
        name: data?.real_name,
      },
      type: "wim",
    });

    if (error) {
      alert(error.message);
      return;
    }

    close();
  }

  return (
    <View>
      <Ionicons name="chatbubble" size={24} color="#444" />
      <FormInput onChangeText={(e) => setWim(e)} />
      <View style={{ height: 48, width: "100%" }}>
        <MenuButton
          func={postWim}
          style={{ width: "100%" }}
          title="Submit Wim"
          icon="cloud-upload"
        />
      </View>
    </View>
  );
};

export default WimModal;
