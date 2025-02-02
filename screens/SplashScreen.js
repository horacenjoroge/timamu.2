import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync(); // Prevent auto-hiding

const SplashScreenComponent = () => {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0.5)).current; // Start small
  const opacityAnim = useRef(new Animated.Value(0)).current; // Start invisible

  useEffect(() => {
    // Start animation
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale to normal size
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // Fade in
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide splash after 2 seconds and navigate to login
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <MaterialCommunityIcons name="brain" size={80} color="white" />
      </Animated.View>
    </View>
  );
};

export default SplashScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
    justifyContent: "center",
    alignItems: "center",
  },
});
