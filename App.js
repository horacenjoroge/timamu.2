import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./screens/Navigator"; // Import only the navigator

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#008080",
    accent: "#50C878",
  },
  fonts: {
    // Base font variants
    regular: { fontFamily: "Montserrat_400Regular" },
    medium: { fontFamily: "Montserrat_400Regular" },
    bold: { fontFamily: "Montserrat_700Bold" },

    // Label variants
    labelLarge: { fontFamily: "Montserrat_700Bold" },
    labelMedium: { fontFamily: "Montserrat_400Regular" },
    labelSmall: { fontFamily: "Montserrat_400Regular" },

    // Body variants
    bodyLarge: { fontFamily: "Montserrat_400Regular" },
    bodyMedium: { fontFamily: "Montserrat_400Regular" },
    bodySmall: { fontFamily: "Montserrat_400Regular" },

    // Title variants
    titleLarge: { fontFamily: "Montserrat_700Bold" },
    titleMedium: { fontFamily: "Montserrat_400Regular" },
    titleSmall: { fontFamily: "Montserrat_400Regular" },

    // Display variants
    displayLarge: { fontFamily: "Montserrat_700Bold" },
    displayMedium: { fontFamily: "Montserrat_700Bold" },
    displaySmall: { fontFamily: "Montserrat_700Bold" },

    // Headline variants
    headlineLarge: { fontFamily: "Montserrat_700Bold" },
    headlineMedium: { fontFamily: "Montserrat_700Bold" },
    headlineSmall: { fontFamily: "Montserrat_700Bold" }
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}