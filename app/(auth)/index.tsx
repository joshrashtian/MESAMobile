import {
    Appearance, Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel/src/Carousel";
import CarouselData from "./CarouselData";

const EntryPage = () => {
  const width = Dimensions.get('window').width



  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.primarycontainer}
        entering={FadeInDown.duration(1000)}
      >
        <Text style={styles.primary}>
          A new way to{" "}
          <Text style={{ color: "#050", fontWeight: "bold" }}>connect</Text> to{" "}
          <Text style={{ color: "#A20", fontWeight: "bold" }}>STEM.</Text>
        </Text>

        <Carousel
          loop
          width={width - 40}
          height={200}
          panGestureHandlerProps={{
            activeOffsetX: [-30, 30],
          }}
          autoPlay
          autoPlayInterval={6000}
          mode={"parallax"}
          data={CarouselData}
          renderItem={({item}) => (
            <View style={{ padding: 4 }}>
              <View style={styles.itemcontainer}>
                <Ionicons name={item.image} size={60} color="#D00" />
                <Text style={styles.header}>{item.text}</Text>
              </View>
            </View>
            )}
        />

        <TouchableOpacity
          onPress={() => router.push("/(auth)/signin")}
          style={styles.signin}
        >
          <Text style={{ color: "#fff", fontFamily: "eudoxus" }}>
            Let's Sign In
          </Text>
          <Ionicons name="arrow-forward-sharp" color="#FFF" size={16} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EntryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#E65C4C",
  },
  primary: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "eudoxus",
    width: "80%",
  },
  primarycontainer: {
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: 500,
    backgroundColor: "#FFF",
    gap: 10
  },
  signin: {
    backgroundColor: "#e40",
    borderRadius: 1000,
    padding: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  itemcontainer: {
    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 30, backgroundColor: '#fefefe',
    gap: 10, paddingHorizontal: 10, shadowColor: '#777', shadowOpacity: 0.5, shadowOffset: { width: 0, height: 1}
  },
  header: {
    fontFamily: 'eudoxus',
    fontSize: 16, textAlign: 'center', color: '#777'
  }
});
