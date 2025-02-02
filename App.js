import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import MainLayout from "./MainLayout"; // ✅ Added MainLayout

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontFamily: "Montserrat_400Regular" },
    medium: { fontFamily: "Montserrat_400Regular" },
    bold: { fontFamily: "Montserrat_700Bold" },
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MainLayout" component={MainLayout} />{" "}
          {/* ✅ Added MainLayout */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
