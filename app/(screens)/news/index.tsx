import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useNews from "@/hooks/useNews";

import RenderHTML from "react-native-render-html";
import Loading from "@/components/Loading";

export default function News() {
  const theme = useTheme();
  const news = useNews();
  const [containerWidth, setContainerWidth] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (news.data.length === 0) {
      setLoading(true);
      news.getNews().finally(() => setLoading(false));
    }
  }, []);

  const handleLoadMore = async () => {
    const { current_page, total_pages } = news.page;
    if (loadingMore || current_page >= total_pages) return;

    setLoadingMore(true);
    await news.getNextPage();
    setLoadingMore(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading />}
      <View style={{ flex: 1, backgroundColor: "#4442" }}>
        <Text style={styles.title}>NOTICIAS</Text>

        {news.data.length > 0 ? (
          <FlatList
            data={news.data}
            renderItem={({ item }) => (
              <Link
                href={{ pathname: `/news/details`, params: { id: item.id } }}
              >
                <View style={styles.newsItem}>
                  <View style={styles.newsImg}>
                    {item.imagen_principal.images["1"] && (
                      <Image
                        src={item.imagen_principal.images["1"].url}
                        style={{ minWidth: "100%", minHeight: "100%" }}
                      />
                    )}
                  </View>
                  <View
                    onLayout={(event) =>
                      setContainerWidth(event.nativeEvent.layout.width)
                    }
                    style={styles.newsText}
                  >
                    <Text style={styles.newsTitle}>{item.title}</Text>
                    <RenderHTML
                      contentWidth={containerWidth}
                      source={{ html: item.body ?? "" }}
                      baseStyle={{
                        ...styles.newsDescription,
                        color: theme.dark ? "#ddd" : "#444",
                      }}
                      // Añade estas props para mejor control del texto
                      enableExperimentalGhostLinesPrevention={true}
                      tagsStyles={{
                        p: {
                          margin: 0,
                          padding: 0,
                        },
                        body: {
                          margin: 0,
                          padding: 0,
                          whiteSpace: "normal",
                        },
                      }}
                    />
                  </View>
                </View>
              </Link>
            )}
            contentContainerStyle={{
              flex: 1,
              gap: 10,
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator
                  size="small"
                  style={{ marginVertical: 20 }}
                />
              ) : null
            }
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>NO HAY NOTICIAS</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 30,
    color: "#222"
  },
  newsItem: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 140,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
  },
  newsImg: {
    width: 120,
    height: 120,
    borderRadius: 6,
    overflow: "hidden",
  },
  newsText: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    paddingRight: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    flexShrink: 1,
    color: "#bbb",
  },
});
