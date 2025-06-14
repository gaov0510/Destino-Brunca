import { TouchableOpacity, View } from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Options({ children, onClose }: Props) {
  return (
    <TouchableOpacity
      style={{
      position: "absolute",
      zIndex: 900,
      top: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "#0004",
      }}
      onPress={onClose}
    >
      <View
      style={{
        zIndex: 50,
        backgroundColor: "white",
        width: 200,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowOffset: { width: 0, height: 2 },
      }}
      >
      {children}
      </View>
    </TouchableOpacity>
  );
}
