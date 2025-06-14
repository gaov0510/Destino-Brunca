import { Image, Platform, StatusBar } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";
import { router } from "expo-router";
import { View } from "react-native";

export default function Login() {
  useEffect(() => {
    setTimeout(() => {
      router.push("/(screens)/home");
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#666",
      }}
    >
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        source={require("@/assets/images/fondo.png")}
      />
      <Image
        style={{ width: 250 }}
        source={require("@/assets/images/adaptive-icon.png")}
      />
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}
