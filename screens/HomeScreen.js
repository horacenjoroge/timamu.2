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
  const [selectedCategory, setSelectedCategory] = useState("");

  // Determine greeting based on device time
  const currentHour = new Date().getHours();
  let greetingMessage = "";
  if (currentHour < 12) greetingMessage = "Good Morning";
  else if (currentHour < 18) greetingMessage = "Good Afternoon";
  else greetingMessage = "Good Evening";

  // Fetch username from AsyncStorage
  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("username");
      if (storedName) setUserName(storedName);
    };
    fetchUserName();
  }, []);

  // Dummy therapist data with realistic names and images
  const therapists = [
    {
      id: 1,
      name: "Dr. Grace Mburu",
      specialty: "Anxiety",
      image: "https://picsum.photos/200?random=21",
    },
    {
      id: 2,
      name: "Dr. Paul Kamau",
      specialty: "Depression",
      image: "https://source.unsplash.com/200x200/?portrait,5",
    },
    {
      id: 3,
      name: "Dr. Amina Yusuf",
      specialty: "Stress Management",
      image: "https://picsum.photos/200?random=22",
    },
    {
      id: 4,
      name: "Dr. David Njoroge",
      specialty: "Trauma",
      image: "https://source.unsplash.com/200x200/?portrait,7",
    },
    {
      id: 5,
      name: "Dr. Wambui Odhiambo",
      specialty: "Relationship Issues",
      image: "https://picsum.photos/200?random=23",
    },
  ];

  // Filter therapists based on search text and selected category
  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchText.toLowerCase()) ||
      therapist.specialty.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      therapist.specialty.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>
        {greetingMessage}
        {userName ? `, ${userName}` : ""}
        {" 👋"}
      </Text>

      {/* Enhanced Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for therapists..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Quick Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {["", "Anxiety", "Depression", "Stress", "Trauma", "Relationship"].map(
          (category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryText}>
                {category === "" ? "All" : category}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Recommended Therapists</Text>

      {/* Therapist Cards */}
      {filteredTherapists.map((therapist) => (
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

      {/* Additional Content */}
      <Text style={styles.additionalContent}>
        Discover top-rated therapists and take the first step towards better
        mental health. Our personalized recommendations ensure you get the
        support you need.
      </Text>
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
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
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
  categories: {
    marginVertical: 15,
  },
  categoryItem: {
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#50C878",
  },
  categoryText: {
    color: "white",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
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
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  therapistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
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
    marginTop: 2,
  },
  additionalContent: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
});
