import { useTheme } from "react-native-paper";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useNews from "@/hooks/useNews";
import RenderHTML from "react-native-render-html";
import { useState } from "react";

const locations = [
  {
    id: 10,
    name: "Buenos Aires",
    img: require("@/assets/images/locations/buenos-aires.png"),
  },
  {
    id: 20,
    name: "Coto Brus",
    img: require("@/assets/images/locations/coto-bus.png"),
  },
  {
    id: 26,
    name: "Golfito",
    img: require("@/assets/images/locations/golfito.png"),
  },
  {
    id: 30,
    name: "Puerto Jimenéz",
    img: require("@/assets/images/locations/puerto-jimenez.png"),
  },
  {
    id: 32,
    name: "Pérez Zeledón",
    img: require("@/assets/images/locations/perez-zeledon.png"),
  },
  {
    id: 33,
    name: "Corredores",
    img: require("@/assets/images/locations/corredores.png"),
  },
  {
    id: 34,
    name: "Osa",
    img: require("@/assets/images/locations/osa.png"),
  },
];

export default function Home() {
  const theme = useTheme();
  const news = useNews();
  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#4442" }}>
      {/* DESTAINTIONS */}
      <View style={styles.destinations}>
        <Text style={styles.title}>DESTINOS</Text>
        <FlatList
          data={locations}
          scrollEnabled={false}
          keyExtractor={(_, index) => Date.now().toString() + index}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/(screens)/home/Location",
                params: { name: item.name },
              }}
              style={{
                marginBottom: 20,
              }}
            >
              <View style={styles.destinationItem}>
                <Text style={styles.destinationName}>
                  {item.name.toUpperCase()}
                </Text>
                <View style={styles.destinationImg}>
                  <Image
                    source={item.img}
                    style={{ width: "100%", height: "100%", opacity: 0.5 }}
                  />
                </View>
              </View>
            </Link>
          )}
        />
      </View>

      {/* NEWS */}
      <View>
        <Text style={[styles.title, { paddingHorizontal: 20 }]}>NOTICIAS</Text>
        {news.data.length > 0 ? (
          <FlatList
            style={{ gap: 10 }}
            data={news.data}
            scrollEnabled={true}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
            keyExtractor={(_, index) => Date.now().toString() + index}
            renderItem={({ item }) => (
              <Link href="/news/details">
                <View
                  onLayout={(event) =>
                    setContainerWidth(event.nativeEvent.layout.width)
                  }
                  style={styles.noticeItem}
                >
                  <View style={styles.noticeImg}>
                    {item.imagen_principal.images["1"].url && (
                      <Image
                        src={item.imagen_principal.images["1"].url}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </View>
                  <Text style={styles.noticeTitle}>{item.title}</Text>
                  <View
                    style={{
                      flex: 1,
                      borderBottomRightRadius: 6,
                      borderBottomLeftRadius: 6,
                      overflow: "hidden",
                    }}
                  >
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
            horizontal
          />
        ) : (
          <Text
            style={{
              width: "100%",
              height: 200,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            NO HAY NOTICIAS
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 20,
    color: "#222"
  },
  destinations: {
    padding: 20,
  },
  destinationItem: {
    position: "relative",
    height: 200,
    display: "flex",
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#555",
    overflow: "hidden",
  },
  destinationName: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    padding: 20,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  destinationImg: {
    position: "relative",
    height: "100%",
    width: "100%",
    backgroundColor: "#222",
  },

  noticeItem: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    width: 200,
    height: 300,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white",
  },
  noticeImg: {
    height: 120,
    width: 180,
    borderRadius: 6,
    backgroundColor: "#555",
    overflow: "hidden",
  },
  noticeTitle: {
    fontWeight: "500",
  },
  newsDescription: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: "justify",
    flexShrink: 1,
    color: "#bbb",
  },
});
