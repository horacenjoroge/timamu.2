// ProfileScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Menu, Divider } from "react-native-paper";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedEmail = await AsyncStorage.getItem("email"); // Optional: if you stored email on login
      if (storedUsername) setUsername(storedUsername);
      if (storedEmail) setEmail(storedEmail);
    };
    fetchUserInfo();
  }, []);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header with Dropdown Menu */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate("ManageAccount");
            }}
            title="Manage Account"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate("Settings");
            }}
            title="Settings"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate("Payments");
            }}
            title="Payments"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              closeMenu();
              handleLogout();
            }}
            title="Logout"
            titleStyle={{ color: "red" }}
          />
        </Menu>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{username || "Guest"}</Text>
        {email ? <Text style={styles.email}>{email}</Text> : null}
      </View>

      {/* (Additional content like statistics or a summary of user activities can be added here) */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#008080",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
  menuIcon: {
    padding: 5,
  },
  profileCard: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
    marginTop: 5,
  },
});
