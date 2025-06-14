import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Input from "@/components/Inputs/TextInput";

interface Props {
  amount: string;
  search: string;
  setAmount: (amount: string) => void;
  setSearch: (search: string) => void;
}

export default function Controls({
  amount,
  search,
  setAmount,
  setSearch,
}: Props) {
  const handleChangeAmount = (amount: string) => {
    if (!isNaN(Number(amount))) setAmount(amount);
  };

  const handleChangeSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View className="flex gap-2">
      <View className="flex flex-row items-center gap-4">
        <Text>Mostrar</Text>
        <View
          style={{
            width: 100,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ccc",
            overflow: "hidden",
          }}
        >
          <Picker
            style={{ height: 50 }}
            selectedValue={amount}
            onValueChange={(value) => setAmount(value)}
          >
            {[5, 10, 15, 20].map((option, index) => (
              <Picker.Item
                key={index}
                label={option.toString()}
                value={option}
              />
            ))}
          </Picker>
        </View>
        <Text>Resultados</Text>
      </View>
      <Input
        name="filter"
        value={search}
        placeholder="Buscar:"
        onChange={(_, value) => handleChangeSearch(value)}
      />
    </View>
  );
}
