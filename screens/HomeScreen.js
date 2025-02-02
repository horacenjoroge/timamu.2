import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [userName, setUserName] = useState("");
  const [searchText, setSearchText] = useState("");

  // Fetch the username stored in AsyncStorage on login
  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("username");
      if (storedName) {
        setUserName(storedName);
      }
    };

    fetchUserName();
  }, []);

  // Dummy therapist data with dynamic images
  const therapists = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialty: "Anxiety",
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Dr. John Smith",
      specialty: "Depression",
      image: "https://source.unsplash.com/200x200/?portrait,1",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Stress",
      image: "https://picsum.photos/200?random=2",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        Good Morning, {userName || "Guest"} 👋
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for therapists..."
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {["Anxiety", "Depression", "Stress", "Trauma"].map(
          (category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Recommended Therapists List */}
      <Text style={styles.sectionTitle}>Recommended Therapists</Text>
      {therapists.map((therapist) => (
        <View key={therapist.id} style={styles.therapistCard}>
          <Image
            source={{ uri: therapist.image }}
            style={styles.therapistImage}
          />
          <View style={styles.therapistInfo}>
            <Text style={styles.therapistName}>{therapist.name}</Text>
            <Text style={styles.therapistSpecialty}>{therapist.specialty}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "#008080",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#50C878",
    padding: 10,
    borderRadius: 8,
  },
  categories: {
    marginVertical: 15,
  },
  categoryItem: {
    backgroundColor: "#008080",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  categoryText: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
    marginBottom: 10,
  },
  therapistCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  therapistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
  },
  therapistSpecialty: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
  },
});
