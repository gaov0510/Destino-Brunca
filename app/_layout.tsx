import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import i18n from '../i18n';

import FontAwesome from "@expo/vector-icons/FontAwesome";

import "../global.css";
import useAuth from "@/hooks/useAuth";

axios.defaults.baseURL = "https://www.destinobrunca.com/";
axios.defaults.withCredentials = false;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const auth = useAuth();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    auth.getToken();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Configuración Android
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("white");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="dark" backgroundColor={"white"} />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </I18nextProvider>
  );
}
