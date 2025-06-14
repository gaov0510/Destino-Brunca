import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";

interface Props {
  name: string;
  label?: string;
  value: string;
  className?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  error?: string;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
  isPassword?: boolean;
}

export default function Input({
  name,
  label,
  value,
  className,
  style,
  placeholder,
  error,
  onChange,
  disabled = false,
  isPassword = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex flex-col gap-2 py-[8px]">
      {label && (
        <Text style={{ paddingLeft: 5, color: Colors.primary.low }}>
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <TextInput
          value={value}
          className={`${className}`}
          style={[
            {
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
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={Colors.primary.low}
          onChangeText={(text) => onChange(name, text)}
          editable={!disabled}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 0,
              top: 12,
              display: "flex",
              justifyContent: "center",
              height: "100%",
              padding: 10,
              width: 90,
              paddingHorizontal: 20,
              transform: [{ translateY: -12 }],
            }}
          >
            <Text style={{ color: Colors.primary.low }}>
              {showPassword ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-sm text-center" style={{ color: "red" }}>
          {error}
        </Text>
      )}
    </View>
  );
}
