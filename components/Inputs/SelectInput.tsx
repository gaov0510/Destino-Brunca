import { StyleProp, Text, View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Picker } from "@react-native-picker/picker";
import Colors from "@/constants/Colors";

interface Props {
  name: string;
  label?: string;
  value: string;
  options: { label: string | number; value: string | number }[];
  placeholder?: string;
  error?: string;
  className?: string;
  styles?: StyleProp<ViewProps>;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
}

export default function SelectInput({
  name,
  label,
  value,
  options,
  placeholder,
  error,
  className,
  onChange,
  disabled,
}: Props) {
  return (
    <View
      style={{ flexDirection: "column", gap: 10, minWidth: 200 }}
      className={className}
    >
      {label && (
        <Text style={{ paddingLeft: 5, color: Colors.primary.low }}>
          {label}
        </Text>
      )}
      <View
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#eee",
          backgroundColor: disabled ? "#8883" : error ? "#f001" : "transparent",
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(name, itemValue)}
          enabled={!disabled}
        >
          <Picker.Item
            label={placeholder || "Seleccionar"}
            value=""
            enabled={false}
          />
          {options.map((option, index) => (
            <Picker.Item
              key={option.value + index.toString()}
              label={option.label.toString()}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {error && (
        <Text className="text-sm text-center" style={{ color: "red" }}>
          {error}
        </Text>
      )}
    </View>
  );
}
