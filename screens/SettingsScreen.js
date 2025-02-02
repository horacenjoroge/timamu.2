// SettingsScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();

  // States for the toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Load the saved preferences from AsyncStorage when the screen mounts
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        const storedDarkMode = await AsyncStorage.getItem("darkModeEnabled");
        if (storedNotifications !== null) {
          setNotificationsEnabled(storedNotifications === "true");
        }
        if (storedDarkMode !== null) {
          setDarkModeEnabled(storedDarkMode === "true");
        }
      } catch (error) {
        console.error("Error loading preferences", error);
      }
    };
    loadPreferences();
  }, []);

  // Toggle notifications: update state and AsyncStorage, then alert the user
  const toggleNotifications = async () => {
    try {
      const newValue = !notificationsEnabled;
      setNotificationsEnabled(newValue);
      await AsyncStorage.setItem("notificationsEnabled", newValue.toString());
      Alert.alert(
        "Notifications",
        newValue ? "Notifications enabled." : "Notifications disabled."
      );
    } catch (error) {
      console.error("Error toggling notifications", error);
    }
  };

  // Toggle dark mode: update state and AsyncStorage, then alert the user
  const toggleDarkMode = async () => {
    try {
      const newValue = !darkModeEnabled;
      setDarkModeEnabled(newValue);
      await AsyncStorage.setItem("darkModeEnabled", newValue.toString());
      Alert.alert(
        "Dark Mode",
        newValue ? "Dark Mode enabled." : "Dark Mode disabled."
      );
      // Optionally: update your global theme or context here so that the app re-renders with the new mode.
    } catch (error) {
      console.error("Error toggling dark mode", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#ccc", true: "#50C878" }}
            thumbColor={notificationsEnabled ? "#008080" : "#f4f3f4"}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#ccc", true: "#50C878" }}
            thumbColor={darkModeEnabled ? "#008080" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("PrivacyPolicy")}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="#008080" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("TermsConditions")}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward" size={20} color="#008080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#008080",
    padding: 15,
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
  optionsContainer: {
    padding: 20,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
});
