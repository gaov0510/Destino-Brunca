import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import useNews from "@/hooks/useNews";

import Loading from "@/components/Loading";
import ItemRow from "@/components/ItemRow";

export default function News() {
  const news = useNews();
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

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
        <Text style={styles.title}>{t("news").toLocaleUpperCase()}</Text>

        {news.data.length > 0 ? (
          <FlatList
            data={news.data}
            renderItem={({ item }) => (
              <Link
                href={{ pathname: `/news/details`, params: { id: item.id } }}
              >
                <ItemRow
                  image={item?.imagen_principal?.images["1"]?.url}
                  title={item.title}
                  textHtml={item.body}
                />
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
            <Text>{t("newsEmpty")}</Text>
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
    color: "#222",
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
