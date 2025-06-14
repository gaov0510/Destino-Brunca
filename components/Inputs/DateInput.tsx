import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";

interface Props {
  name: string;
  label?: string;
  value: Date;
  className?: string;
  placeholder?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  isPassword?: boolean;
}

export default function DateInput({
  name,
  label,
  value,
  className,
  placeholder,
  error,
  onChange,
  disabled = true,
  isPassword = false,
}: Props) {
  return (
    <View className="flex flex-col gap-2 py-[8px]">
      {label && (
        <Text style={{ paddingLeft: 5, color: Colors.primary.low }}>
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <TextInput
          value={formatDate(value)}
          className={`${className}`}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: error ? "red" : "#eee",
            paddingRight: isPassword ? 40 : 10,
            backgroundColor: disabled
              ? "#8883"
              : error
              ? "#f001"
              : "transparent",
          }}
          placeholder={placeholder}
          placeholderTextColor={Colors.primary.low}
          onChangeText={(text) => onChange(name, text)}
          editable={!disabled}
          secureTextEntry={isPassword}
        />
      </View>
      {error && (
        <Text className="text-sm text-center" style={{ color: "red" }}>
          {error}
        </Text>
      )}
    </View>
  );
}

function formatDate(dateString: Date): string {
  const date = new Date(dateString);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${`0${day}`.slice(-2)} ${month} del ${year}`;
}
