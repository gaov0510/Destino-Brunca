import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import IconUpload from "../Icons/IconUpload";
import Colors from "@/constants/Colors";

interface Props {
  children?: React.ReactNode;
  file?: File | null;
  label?: string;
  onChange: (file: File) => void;
}

export default function FileInput({ children, file, label, onChange }: Props) {
  const handleFilePick = async () => {
    DocumentPicker.getDocumentAsync()
      .then((res) => {
        if (!res.canceled && res.assets[0]) {
          const asset = res.assets[0];

          const fileObj = ({
            uri: asset.uri,
            name: asset.name || "document",
            type: asset.mimeType || "application/octet-stream",
            size: asset.size || 0,
          } as unknown) as File;

          onChange(fileObj);
        }
      })
      .catch((error) => {
        console.error("Error picking document:", error);
      });
  };

  return (
    <View>
      {children ? (
        <TouchableOpacity onPress={handleFilePick}>{children}</TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            height: 200,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: file ? "green" : Colors.primary.low,
            borderStyle: "dashed",
            backgroundColor: file ? "#d4f5d411" : "#d0e7ff11",
          }}
          onPress={handleFilePick}
        >
          {!file ? (
            <View className="flex items-center">
              <Text
                style={{
                  color: Colors.primary.low,
                  marginTop: 10,
                }}
              >
                Presione para subir un archivo
              </Text>
              <IconUpload fill="#eef" width="80" height="80" />
            </View>
          ) : (
            <View className="flex items-center">
              <View className="grow flex justify-center items-center">
                <Text
                  style={{
                    color: Colors.primary.low,
                    fontSize: 14,
                  }}
                >
                  Archivo seleccionado:
                </Text>
                <Text
                  style={{
                    color: Colors.primary.low,
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {file.name}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-4 p-4 pt-0">
                <Text style={{ color: "#89a" }}>
                  Presione para cambiar de archivo
                </Text>
                <IconUpload fill="#eef" width="30" height="30" />
              </View>
            </View>
          )}
        </TouchableOpacity>
      )}
      <Text
        style={{ margin: 5, textAlign: "center", color: Colors.primary.low }}
      >
        {label}
      </Text>
    </View>
  );
}
