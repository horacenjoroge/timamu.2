// MessagesScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const messagesData = [
  {
    id: "1",
    sender: "Dr. Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "Appointment Reminder",
    snippet: "Your session with Dr. Jane Doe is confirmed for tomorrow...",
    time: "09:30 AM",
  },
  {
    id: "2",
    sender: "Dr. John Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    title: "New Message from Dr. John Smith",
    snippet: "Hi, I wanted to follow up on our last session. Let me know...",
    time: "Yesterday",
  },
  {
    id: "3",
    sender: "Therapy Updates",
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Promotion & Updates",
    snippet: "Check out our new features and upcoming webinars...",
    time: "2 days ago",
  },
  {
    id: "4",
    sender: "Feedback",
    avatar: "https://i.pravatar.cc/150?img=4",
    title: "Session Feedback",
    snippet:
      "We would love to hear your feedback regarding your recent session...",
    time: "3 days ago",
  },
];

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter messages based on search query
  const filteredMessages = messagesData.filter(
    (message) =>
      message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Chat", { messageId: item.id })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.senderName}>{item.sender}</Text>
        <Text style={styles.messageTitle}>{item.title}</Text>
        <Text style={styles.messageSnippet} numberOfLines={1}>
          {item.snippet}
        </Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Compose")}
          style={styles.composeButton}
        >
          <Ionicons name="create" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#ccc"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No messages found</Text>
        }
      />
    </View>
  );
};

export default MessagesScreen;

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
    justifyContent: "space-between",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
  composeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  messagesList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  messageItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
  },
  messageTitle: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
    marginTop: 2,
  },
  messageSnippet: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
    marginTop: 2,
  },
  messageTime: {
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
    marginTop: 20,
  },
});
