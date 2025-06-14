import React from "react";
import { Text, View } from "react-native";
import Loading from "../Loading";

export interface Estadisticas {
  title: string;
  amount: string;
  percentage: string;
}

interface Props {
  item: Estadisticas;
  loading: boolean;
}

export default function StatsContainer({ item, loading }: Props) {
  return (
    <View className="relative border-[1px] border-gray-300 rounded-[5px] overflow-hidden">
      <View className="flex flex-row justify-between items-center gap-4 p-4">
        <View className="flex flex-col gap-2">
          <Text className="text-xl font-medium">{item.title}</Text>
          <Text className="text-2xl font-bold">{item.amount}</Text>
          <View className="relative z-20 flex flex-row gap-2 text-[13px]">
            <Text style={{ color: "#03D87F" }}>{item.percentage}</Text>
            <Text style={{ color: "#aaa" }}>Hoy</Text>
          </View>
        </View>
      </View>
      {loading && <Loading opaque />}
    </View>
  );
}
