import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { News } from "@/interface/News";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useSearch from "@/hooks/useSearch";
import useNews from "@/hooks/useNews";

import RenderHTML from "react-native-render-html";
import IconClose from "@/components/Icons/IconClose";

export default function NewsDetails() {
  const params = useLocalSearchParams();
  const newsData = useNews();
  const searchData = useSearch();
  const [news, setNews] = useState<News>();
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    console.log("Item", params.apiId);

    if (params.id) {
      const data = newsData.data.find((data) => data.id === params.id);
      if (data) setNews(data);
    }

    if (params.apiId) {
      const data = searchData.data.find((data) => data.id === params.apiId);
      if (data) setNews(data);
    }
  }, [params]);

  if (!news) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        {news?.imagen_principal?.images[1] && (
          <Image
            source={{ uri: news.imagen_principal.images[1]?.url }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <IconClose fill="white" width={28} height={28} />
        </TouchableOpacity>
        <View style={styles.headerOverlay} />
        <Text style={styles.headerTitle}>{news.title}</Text>
      </View>

      <View
        style={styles.content}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <View style={styles.meta}>
          <Text style={styles.author}>
            Por {news?.author?.name} -{" "}
            {new Date(news.creado).toLocaleDateString()}
          </Text>
        </View>
        <RenderHTML
          contentWidth={containerWidth}
          source={{ html: news.body }}
          baseStyle={styles.body}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 220,
    position: "relative",
    justifyContent: "flex-end",
    marginBottom: 10,
    backgroundColor: "#000",
  },
  headerImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0.8,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    opacity: 0.3,
  },
  closeBtn: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    padding: 10,
    margin: 10,
    borderRadius: "50%",
    backgroundColor: "#0004",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    zIndex: 20,
    textShadowColor: "#000a",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },

  content: {
    height: "100%",
    padding: 18,
  },
  meta: {
    marginBottom: 14,
  },
  category: {
    color: "#6ec6ff",
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 15,
  },
  author: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 20,
  },
});
