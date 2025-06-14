import { Link, router, useLocalSearchParams } from "expo-router";
import { Destination as DestinationTS } from "@/interface/Destination";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { RenderHTML } from "react-native-render-html";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useDestinations from "@/hooks/useDestinations";
import IconClose from "@/components/Icons/IconClose";
import Loading from "@/components/Loading";

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

export default function Destination() {
  const params = useLocalSearchParams();
  const destinations = useDestinations();
  const [containerWidth, setContainerWidth] = useState(0);
  const [loadingNextPage, setLoadingNextPage] = useState(false);
  const [data, setData] = useState<DestinationTS[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<{
    id: number;
    name: string;
    img: ImageSourcePropType | undefined;
  }>();

  useEffect(() => {
    console.log(params.categoryId, location?.id, location);
    if (params.categoryId && location?.id) {
      setLoading(true);
      destinations
        .getDestinations(params.categoryId as string, location?.id.toString())
        .then((data) => {
          if (data) {
            setLoading(false);
            setData(data);
          }
        });
    }
  }, [location]);

  useEffect(() => {
    if (params.name) {
      const currentLocation = locations.find(
        (location) => location.name === params.location
      );
      if (currentLocation) setLocation(currentLocation);
    }
  }, [params]);

  const handleEndReached = async () => {
    const { current_page, total_pages } = destinations.page;
    if (current_page < total_pages && !loadingNextPage) {
      setLoadingNextPage(true);
      await destinations.getNextPage();
      setLoadingNextPage(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading />}
      <View style={styles.locationHead}>
        <Text style={styles.locationName}>{location?.name.toUpperCase()}</Text>
        <View style={styles.locationImg}>
          {location?.img && (
            <Image
              source={location.img}
              style={{ width: "100%", height: "100%" }}
            />
          )}
          <TouchableOpacity
            style={styles.locationCloseBtn}
            onPress={() => router.back()}
          >
            <IconClose fill="white" width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, height: 100, backgroundColor: "#4442" }}>
        {data.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.destinationContent}
            data={data}
            keyExtractor={(_, index) => (Date.now() + index).toString()}
            renderItem={({ item, index }) => (
              <Link
                href={{
                  pathname: "/(screens)/home/DestinationDetails",
                  params: { index, name: params.location },
                }}
              >
                <View style={styles.destiontionItem}>
                  <View style={styles.destinationImg}>
                    {item.images["1"] && (
                      <Image
                        src={item.images["1"].url}
                        style={{ minWidth: "100%", minHeight: "100%" }}
                      />
                    )}
                  </View>
                  <View
                    onLayout={(event) =>
                      setContainerWidth(event.nativeEvent.layout.width)
                    }
                    style={styles.destinationText}
                  >
                    <Text style={styles.destinationTitle}>{item.title}</Text>
                    <RenderHTML
                      contentWidth={containerWidth}
                      source={{ html: item.body ?? "" }}
                      baseStyle={styles.destinationDescription}
                    />
                  </View>
                </View>
              </Link>
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.6}
            ListFooterComponent={
              loadingNextPage ? (
                <ActivityIndicator
                  size="small"
                  style={{ marginVertical: 20 }}
                />
              ) : null
            }
          />
        ) : (
          !loading && (
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No se encontraron destinos</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationHead: {
    position: "relative",
    height: 200,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#555",
    overflow: "hidden",
  },
  locationCloseBtn: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    right: 0,
    padding: 10,
    margin: 10,
    borderRadius: "50%",
    backgroundColor: "#0004",
  },
  locationName: {
    position: "absolute",
    zIndex: 100,
    bottom: 10,
    left: 10,
    padding: 20,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  locationImg: {
    position: "relative",
    height: "100%",
    width: "100%",
    opacity: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },

  destinationContent: { padding: 20, gap: 10 },
  destiontionItem: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: 120,
    marginBottom: 20,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCC",
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  destinationImg: {
    width: 100,
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCC",
    overflow: "hidden",
  },
  destinationText: {
    flex: 1,
    gap: 5,
    height: "100%",
    overflow: "hidden",
  },
  destinationTitle: {
    fontWeight: "500",
  },
  destinationDescription: {
    fontSize: 12,
    color: "#666",
  },
});
