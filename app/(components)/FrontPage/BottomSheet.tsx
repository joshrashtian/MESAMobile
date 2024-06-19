import { View, Text, Dimensions, FlatList, Pressable } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import RecentNews from "./RecentNews";
import MenuButton from "../Components/MenuButton";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  ZoomInEasyUp,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const NewBottomSheet = () => {
  const [pos, setPos] = useState<number>(1);
  const points = useMemo(() => ["22%", "33%", "54%"], []);

  const buttons = useMemo(
    () => [
      {
        icon: <Ionicons name="settings" size={24} color="#FFF" />,
        colors: ["#4867B7", "#6048B7", "#489FB7"],
      },
    ],
    [pos]
  );

  useEffect(() => {
    switch (pos) {
      case 0:
        bottomPanelHeight.value = 0;
        bottomPanelOpacity.value = 0;
        break;
      case 1:
        bottomPanelHeight.value = 50;
        bottomPanelOpacity.value = 1;
        break;
      case 2:
        bottomPanelHeight.value = 225;
        bottomPanelOpacity.value = 1;
        break;
    }
  }, [pos]);

  const bottomPanelHeight = useSharedValue(0);
  const bottomPanelOpacity = useSharedValue(1);

  const bottomPanelStyle = useAnimatedStyle(() => ({
    height: withTiming(bottomPanelHeight.value),
    opacity: withTiming(bottomPanelOpacity.value),
  }));

  return (
    <BottomSheet
      snapPoints={points}
      onChange={(index: number) => setPos(index)}
      handleIndicatorStyle={{
        backgroundColor: "#ddd",
        width: 25,
      }}
      handleStyle={{
        backgroundColor: "#000",
        marginBottom: 10,
      }}
      handleComponent={() => (
        <>
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: 50,
              backgroundColor: "#000",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 15,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "#E65C4F",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 20 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              }}
            />
            <View
              style={{
                backgroundColor: "#ddd",
                width: 30,
                borderRadius: 10,
                height: 4,
                alignSelf: "center",
              }}
            />
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 15,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                backgroundColor: "#FFF",
              }}
            />
          </View>
        </>
      )}
      index={1}
    >
      <View>
        <View
          style={{
            height: 50,
            width: "100%",
            padding: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 3,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <RecentNews />
        </View>
        <View
          style={{
            height: 50,
            width: Dimensions.get("screen").width,
            padding: 2,
            flexDirection: "row",
            gap: 3,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <MenuButton link={"/connect/Social/"} title="Social" icon="people" />
          <MenuButton
            link={"/connect/Event/ForYouEvents/"}
            title="Events For You"
            icon="calendar"
          />
        </View>
        <View style={{ padding: 20 }}>
          {pos > 0 && (
            <Animated.View
              style={[
                { backgroundColor: "#f9f9f9", borderRadius: 20 },
                bottomPanelStyle,
              ]}
            >
              {/*<FlatList
                data={buttons}
                renderItem={({ item }) => (
                  <Pressable>
                    <LinearGradient
                      colors={item.colors}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </LinearGradient>
                  </Pressable>
                )}
                    />*/}
            </Animated.View>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default NewBottomSheet;
