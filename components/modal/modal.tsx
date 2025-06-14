import { View, Text, TouchableOpacity, Modal } from "react-native";
import Colors from "@/constants/Colors";
import IconClose from "../Icons/IconClose";
import Loading from "../Loading";

interface Props {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  loading?: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

export default function ModalCustom({
  title,
  children,
  loading,
  onSubmit,
  onClose,
  visible,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex justify-center items-center w-full h-full"
        style={{
          flex: 1,
          backgroundColor: "#0004",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {(loading) && <Loading />}
        <View
          className="rounded bg-white overflow-hidden"
          style={{
            borderRadius: 4,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            width: "90%",
          }}
        >
          <View
            className="flex-row justify-between items-center p-6"
            style={{ backgroundColor: Colors.primary.normal }}
          >
            <Text className="text-white font-semibold">{title}</Text>
            <TouchableOpacity className="h-full" onPress={onClose}>
              <IconClose fill="white" width="20" height="20" />
            </TouchableOpacity>
          </View>
          <View>{children}</View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 16,
              padding: 8,
              borderTopWidth: 1,
              borderTopColor: "#E5E7EB",
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 24,
                borderRadius: 4,
              }}
              onPress={onClose}
            >
              <Text className="text-gray-600 font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 24,
                borderRadius: 4,
                backgroundColor: "#BFDBFE",
                padding: 10,
              }}
              onPress={onSubmit}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: Colors.primary.normal,
                }}
              >
                Aceptar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
