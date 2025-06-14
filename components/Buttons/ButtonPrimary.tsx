import { Text, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";

interface Props {
  text: string;
  onPress: () => void;
  className?: string;
  outline?: boolean;
  disabled?: boolean;
}

export default function ButtonPrimary({
  text,
  onPress,
  className,
  outline,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      className={className}
      style={{
        display: "flex",
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary.normal,
        backgroundColor: outline ? "transparent" : Colors.primary.normal,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: outline ? Colors.primary.normal : "white",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
