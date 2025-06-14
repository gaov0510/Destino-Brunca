import { Dimensions, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

import SelectInput from "../Inputs/SelectInput";
import Colors from "@/constants/Colors";

export interface Charts {
  title: string;
  data: number[];
  labels: string[];
  filter: {
    year: number;
    month: number;
  };
}

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

interface Props {
  chart: Charts;
  loading: boolean;
  onChangeFilter: (type: keyof Charts["filter"], value: number) => void;
}

export default function ChartContainer({
  chart,
  loading,
  onChangeFilter,
}: Props) {
  return (
    <View className="border-[1px] border-gray-300 rounded-[5px]">
      <View className="flex flex-row gap-4 w-full p-2 border-b-[1px] border-gray-300">
        <Text className="grow p-4 text-lg font-medium">{chart.title}</Text>
        <SelectInput
          name="year"
          className="w-[120]"
          placeholder="Mes"
          value={chart.filter.year.toString()}
          options={months.map((value, index) => ({
            label: value,
            value: (index + 1).toString(),
          }))}
          onChange={(name, value) =>
            onChangeFilter(name as keyof Charts["filter"], Number(value))
          }
        />
      </View>
      <View className="relative">
        {loading && (
          <View className="absolute z-50 top-0 left-0 flex justify-center items-center w-full h-full bg-white">
            <Text>Cargando...</Text>
          </View>
        )}
        <View className="p-4 overflow-hidden">
          <BarChart
            data={{
              labels: chart.labels,
              datasets: [
                {
                  data: chart.data.length > 0 ? chart.data : [0],
                },
              ],
            }}
            width={Dimensions.get("window").width - 55} // from react-native
            height={400}
            verticalLabelRotation={-90}
            xLabelsOffset={-40}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(10, 40, 200, ${opacity})`,
              labelColor: (opacity = 1) => Colors.primary.low,
              style: { borderRadius: 16 },
              propsForDots: { r: "0" },
              fillShadowGradientTo: Colors.primary.normal,
              fillShadowGradientFrom: Colors.primary.normal,
              fillShadowGradientOpacity: 0, // Full opacity for uniform color
              barPercentage: 1, // Ensures solid color without gradient
            }}
            style={{
              marginTop: 10,
              marginBottom: -60,
              borderRadius: 16,
            }}
            fromZero={true} // Ensures the chart starts from zero
          />
        </View>
      </View>
    </View>
  );
}
