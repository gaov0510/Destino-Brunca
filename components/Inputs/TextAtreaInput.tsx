import Colors from "@/constants/Colors";
import { Text, TextInput, View, Platform } from "react-native";

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  numberOfLines?: number;
  minHeight?: number;
}

export default function TextAreaInput({
  name,
  label,
  value,
  onChange,
  error,
  disabled,
  numberOfLines = 4,
  minHeight = 100,
}: Props) {
  const handleKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Enter') {
      onChange(name, value + '\n');
    }
  };

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
          style={[
            {
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: error ? "red" : "#eee",
              paddingRight: 10,
              backgroundColor: disabled
                ? "#8883"
                : error
                ? "#f001"
                : "transparent",
              textAlignVertical: "top",
              minHeight: minHeight,
            },
          ]}
          placeholderTextColor={Colors.primary.low}
          onChangeText={(text) => onChange(name, text)}
          onKeyPress={handleKeyPress}
          editable={!disabled}
          multiline={true}
          numberOfLines={numberOfLines}
          scrollEnabled={true}
          blurOnSubmit={false} // Esto es crucial
          returnKeyType={Platform.OS === 'ios' ? 'default' : 'none'} // Importante para Android
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