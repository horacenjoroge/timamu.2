import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import SplashScreen from "../components/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainLayout from "../screens/MainLayout";
import HomeScreen from "../screens/HomeScreen";
import FindTherapistScreen from "../screens/FindTherapistScreen";
import LearnMoreScreen from "../screens/LearnMoreScreen";
import BookNowScreen from "../screens/BookNowScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

// Separate stack for screens that should be wrapped by MainLayout
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FindTherapist" component={FindTherapistScreen} />
      <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
      <Stack.Screen name="BookNow" component={BookNowScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

// Wrapper component to combine MainLayout with MainStack
const MainLayoutWrapper = () => {
  return (
    <MainLayout>
      <MainStack />
    </MainLayout>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen 
        name="MainApp" 
        component={MainLayoutWrapper}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;