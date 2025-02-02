import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const FindTherapistScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  // Dummy data for multiple therapists with extra information
  const therapists = [
    {
      id: 1,
      name: "Dr. Jane Doe",
      specialty: "Anxiety",
      price: "KES 1500/session",
      available: true,
      rating: 4.8,
      experience: "10 years",
      image: "https://picsum.photos/200?random=11",
    },
    {
      id: 2,
      name: "Dr. John Smith",
      specialty: "Depression",
      price: "KES 1800/session",
      available: false,
      rating: 4.5,
      experience: "8 years",
      image: "https://source.unsplash.com/200x200/?portrait,2",
    },
    {
      id: 3,
      name: "Dr. Emily White",
      specialty: "Stress Management",
      price: "KES 1600/session",
      available: true,
      rating: 4.7,
      experience: "9 years",
      image: "https://picsum.photos/200?random=12",
    },
    {
      id: 4,
      name: "Dr. Samuel Otieno",
      specialty: "Trauma",
      price: "KES 2000/session",
      available: true,
      rating: 4.9,
      experience: "12 years",
      image: "https://source.unsplash.com/200x200/?portrait,3",
    },
    {
      id: 5,
      name: "Dr. Grace Wanjiku",
      specialty: "Relationship Issues",
      price: "KES 1700/session",
      available: false,
      rating: 4.6,
      experience: "7 years",
      image: "https://picsum.photos/200?random=13",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Find a Therapist</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, specialty..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick Filter Options */}
      <View style={styles.filterOptions}>
        {["Budget", "Specialty", "Availability"].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterOption}
            activeOpacity={0.7}
          >
            <Text style={styles.filterText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Therapist List */}
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
            <Text style={styles.therapistPrice}>{therapist.price}</Text>
            <View style={styles.row}>
              <Ionicons name="star" size={14} color="#FFDD57" />
              <Text style={styles.ratingText}> {therapist.rating}</Text>
              <Text style={styles.experienceText}>
                {" "}
                • {therapist.experience} experience
              </Text>
            </View>
            <Text
              style={[
                styles.availability,
                { color: therapist.available ? "green" : "red" },
              ]}
            >
              {therapist.available ? "Available" : "Not Available"}
            </Text>
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                style={styles.bookButton}
                labelStyle={styles.buttonLabel}
                onPress={() =>
                  navigation.navigate("BookNow", { therapist: therapist })
                }
              >
                Book Now
              </Button>
              <TouchableOpacity
                style={styles.learnMoreButton}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("LearnMore", { therapist: therapist })
                }
              >
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FindTherapistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
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
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#50C878",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  filterOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  filterOption: {
    backgroundColor: "#008080",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  filterText: {
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  therapistImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
  therapistPrice: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  experienceText: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    marginLeft: 5,
  },
  availability: {
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  bookButton: {
    backgroundColor: "#50C878",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  buttonLabel: {
    fontFamily: "Montserrat_700Bold",
  },
  learnMoreButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: "#008080",
    borderWidth: 1,
    borderRadius: 8,
  },
  learnMoreText: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    color: "#008080",
  },
});
