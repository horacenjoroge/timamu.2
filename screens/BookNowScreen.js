// BookNow.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookNow = ({ route, navigation }) => {
  // Get the therapist object passed from the previous screen
  const { therapist } = route.params;

  // State for date and time selections
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handler when a date is selected
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Handler when a time is selected
  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Format date and time for display
  const formattedDate = date.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handler to confirm the booking with error handling
  const handleConfirmBooking = () => {
    // Combine the selected date and time into a single Date object
    const bookingDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    const now = new Date();
    if (bookingDateTime <= now) {
      Alert.alert(
        "Invalid Booking",
        "Please select a future date and time for your session."
      );
      return;
    }

    Alert.alert(
      "Booking Confirmed",
      `Your session with ${therapist.name} is booked for ${formattedDate} at ${formattedTime}.`
    );
  };

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
        <Text style={styles.headerTitle}>Book Now</Text>
      </View>

      {/* Therapist Summary Card */}
      <View style={styles.therapistCard}>
        <Image
          source={{ uri: therapist.image }}
          style={styles.therapistImage}
        />
        <View style={styles.therapistInfo}>
          <Text style={styles.therapistName}>{therapist.name}</Text>
          <Text style={styles.therapistSpecialty}>{therapist.specialty}</Text>
          <Text style={styles.therapistPrice}>{therapist.price}</Text>
        </View>
      </View>

      {/* Booking Details Section */}
      <View style={styles.bookingDetails}>
        <Text style={styles.sectionTitle}>Select Date and Time</Text>

        {/* Date Picker Button */}
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.pickerButtonText}>Date: {formattedDate}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Time Picker Button */}
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowTimePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.pickerButtonText}>Time: {formattedTime}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>

      {/* Confirm Booking Button */}
      <Button
        mode="contained"
        style={styles.confirmButton}
        labelStyle={styles.buttonLabel}
        onPress={handleConfirmBooking}
      >
        Confirm Booking
      </Button>
    </ScrollView>
  );
};

export default BookNowScreen;

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
  therapistCard: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 15,
    padding: 15,
    borderRadius: 10,
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
    fontSize: 18,
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
  bookingDetails: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    color: "#008080",
    marginBottom: 10,
  },
  pickerButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  pickerButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#50C878",
    marginHorizontal: 15,
    marginBottom: 30,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonLabel: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
});
