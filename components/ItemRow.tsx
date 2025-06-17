import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

interface Props {
  image: string;
  title: string;
  textHtml: string;
}

export default function ItemRow({ image, title, textHtml }: Props) {
  
  useEffect(() => {
    console.log(1);
  }, []);
  
  return (
    <View style={styles.item}>
      <View style={styles.itemImg}>
        {image && (
          <Image src={image} style={{ minWidth: "100%", minHeight: "100%" }} />
        )}
      </View>
      <View style={styles.itemText}>
        <Text style={styles.itemTitle} numberOfLines={3} ellipsizeMode="tail">
          {title}
        </Text>
        <PreviewText html={textHtml} />
      </View>
    </View>
  );
}

// Función para eliminar etiquetas HTML y obtener texto plano
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, ""); // Elimina todas las etiquetas HTML
};

// Componente PreviewText
const PreviewText = ({
  html,
  maxLines = 3,
}: {
  html: string;
  maxLines?: number;
}) => {

  useEffect(() => {
    console.log(2);
  }, []);
  
  return (
    <Text
      numberOfLines={maxLines}
      ellipsizeMode="tail"
      style={styles.itemDescription}
    >
      {stripHtmlTags(html)}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 30,
    color: "#222",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 140,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
  },
  itemImg: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: "hidden",
  },
  itemText: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    paddingRight: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    flexShrink: 1,
    color: "#444",
  },
});
