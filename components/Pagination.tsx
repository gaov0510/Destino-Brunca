import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";

import Colors from "@/constants/Colors";

interface Props {
  currentPage: number;
  totalPages: number;
  dataPerPage: number;
  totalData: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  dataPerPage,
  totalData,
  onPageChange,
}: Props) {
  // Genera los números de página a mostrar
  const getPageNumbers = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <View className="flex flex-col gap-4">
      <Text
        style={{ color: Colors.primary.low }}
        className="m-auto mt-4 text-center"
      >
        Mostrando {(currentPage - 1) * dataPerPage} a{" "}
        {currentPage * dataPerPage} de {totalData} resultados
      </Text>

      <View className="flex flex-row justify-center items-center gap-2 m-auto mt-4">
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: currentPage <= 1 ? "#ccc" : Colors.primary.normal,
            overflow: "hidden",
          }}
          onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          <Text
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
              color: currentPage <= 1 ? "#888" : Colors.primary.normal,
            }}
          >
            Anterior
          </Text>
        </TouchableOpacity>

        {getPageNumbers().map((pageNum) => (
          <TouchableOpacity key={pageNum} onPress={() => onPageChange(pageNum)}>
            <Text
              className="w-[30] h-[30] py-2 text-center"
              style={{
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 10,
                backgroundColor: Colors.primary.normal,
              }}
            >
              {pageNum}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor:
              currentPage >= totalPages ? "#ccc" : Colors.primary.normal,
            overflow: "hidden",
          }}
          onPress={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        >
          <Text
            className="h-[30] px-4 py-2"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 20,
              color: currentPage >= totalPages ? "#888" : Colors.primary.normal,
            }}
          >
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
