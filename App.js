import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

// Import all screens
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MainLayout from "./screens/MainLayout";
import HomeScreen from "./screens/HomeScreen";
import FindTherapistScreen from "./screens/FindTherapistScreen";
import LearnMoreScreen from "./screens/LearnMoreScreen";
import BookNowScreen from "./screens/BookNowScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

// Update the theme to include additional typography variants
const theme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontFamily: "Montserrat_400Regular" },
    medium: { fontFamily: "Montserrat_400Regular" },
    bold: { fontFamily: "Montserrat_700Bold" },
    labelLarge: { fontFamily: "Montserrat_700Bold" },
    labelMedium: { fontFamily: "Montserrat_400Regular" },
    labelSmall: { fontFamily: "Montserrat_400Regular" },
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
          <Stack.Screen name="MainLayout" component={MainLayout} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FindTherapist" component={FindTherapistScreen} />
          <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
          <Stack.Screen name="BookNow" component={BookNowScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
