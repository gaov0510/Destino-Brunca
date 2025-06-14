import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import Pdf from "react-native-pdf";

interface Props {
  fileUrl: string;
  onClose: () => void;
}

const FileViewer = ({ fileUrl, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Verifica el tipo de archivo
  const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(fileUrl);
  const isPdf = /\.(pdf)$/i.test(fileUrl);

  if (!fileUrl) {
    return <Text style={styles.error}>No se proporcionó un link válido.</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#444",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{
            padding: 10,
            backgroundColor: "#222",
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
            {"<"} Volver
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            padding: 10,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          {fileUrl.split("/").pop()}
        </Text>
      </View>
      <View style={{ flex: 1, width: "100%", padding: 20 }}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {isImage && (
          <Image
            source={{ uri: fileUrl }}
            style={styles.file}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setError("Error al cargar la imagen")}
            resizeMode="contain"
          />
        )}

        {/*  <Pdf
          source={{
            uri:
              "https://izoom.enteratek.app/public/archivos/evidencia/20250424030710.pdf",
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{ backgroundColor: "red" }}
        />
 */}
        {!isImage && !isPdf && (
          <Text style={styles.error}>
            Formato no soportado. Use PDF o imágenes.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: 10,
    paddingTop: 20,
    backgroundColor: "#0006",
  },
  file: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default FileViewer;
