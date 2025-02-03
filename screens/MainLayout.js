import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Import all screens
import HomeScreen from "./HomeScreen";
import FindTherapistScreen from "./FindTherapistScreen";
import MessagesScreen from "./MessagesScreen";
import ProfileScreen from "./ProfileScreen";
import BookNowScreen from "./BookNowScreen";

import SettingsScreen from "./SettingsScreen";
import LearnMoreScreen from "./LearnMoreScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigators for each tab that needs nested navigation
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="BookNow" component={BookNowScreen} />
    <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
  </Stack.Navigator>
);

const MessagesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MessagesMain" component={MessagesScreen} />
   
  </Stack.Navigator>
);

const FindTherapistStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FindTherapistMain" component={FindTherapistScreen} />
    <Stack.Screen name="BookNow" component={BookNowScreen} />
    <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

const MainLayout = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="brain" size={30} color="white" />
        <TouchableOpacity>
          <FontAwesome name="user-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for therapists..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#50C878",
          tabBarInactiveTintColor: "white",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="FindTherapist"
          component={FindTherapistStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubbles" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#008080",
    padding: 15,
    paddingTop: 45, // Add extra padding for status bar
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#50C878",
    padding: 8,
    borderRadius: 8,
  },
  tabBar: {
    backgroundColor: "#008080",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});