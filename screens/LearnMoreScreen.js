import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const LearnMoreScreen = ({ route, navigation }) => {
  // The therapist object is passed via route parameters
  const { therapist } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Therapist Details</Text>
      </View>

      {/* Therapist Image */}
      <Image source={{ uri: therapist.image }} style={styles.therapistImage} />

      {/* Therapist Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{therapist.name}</Text>
        <Text style={styles.specialty}>{therapist.specialty}</Text>
        <Text style={styles.price}>{therapist.price}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFDD57" />
          <Text style={styles.rating}> {therapist.rating}</Text>
          <Text style={styles.experience}>
            {" "}
            • {therapist.experience} experience
          </Text>
        </View>

        {/* About Section */}
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {therapist.description ||
            `Dr. ${therapist.name} is a renowned specialist in ${
              therapist.specialty
            }. With ${
              therapist.experience
            } of experience, they have dedicated their career to helping individuals overcome challenges related to ${therapist.specialty.toLowerCase()}. Graduated from a prestigious institution, Dr. ${
              therapist.name
            } offers a compassionate and evidence-based approach to therapy. Contact details and further information are available below.`}
        </Text>

        {/* Education Section (if available) */}
        {therapist.education && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={styles.detailText}>{therapist.education}</Text>
          </>
        )}

        {/* Contact Section (if available) */}
        {therapist.contact && (
          <>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.detailText}>{therapist.contact}</Text>
          </>
        )}

        {/* Book Now Button */}
        <Button
          mode="contained"
          style={styles.bookButton}
          labelStyle={styles.buttonLabel}
          onPress={() =>
            Alert.alert("Booking", "Booking functionality goes here")
          }
        >
          Book Now
        </Button>
      </View>
    </ScrollView>
  );
};

export default LearnMoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#008080",
    alignItems: "center",
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
  therapistImage: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "#333",
    marginBottom: 5,
  },
  specialty: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    color: "#666",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  experience: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    color: "#008080",
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    lineHeight: 22,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: "#50C878",
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
});
