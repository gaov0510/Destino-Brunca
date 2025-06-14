import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import IconClose from "@/components/Icons/IconClose";

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

const options: {
  id: number;
  name: string;
  img: ImageSourcePropType | undefined;
}[] = [
  {
    id: 1,
    name: "Alimentación",
    img: require("@/assets/images/locations/options/alimentacion.png"),
  },
  {
    id: 57,
    name: "Alojamiento",
    img: require("@/assets/images/locations/options/alojamiento.png"),
  },
  {
    id: 65,
    name: "Balneario",
    img: require("@/assets/images/locations/options/balneario.png"),
  },
  {
    id: 4,
    name: "Centros Turísticos",
    img: require("@/assets/images/locations/options/centros-turisticos.png"),
  },
  {
    id: 60,
    name: "Manifestación Cultural",
    img: require("@/assets/images/locations/options/manifestacion-cultural.png"),
  },
];

export default function Index() {
  const params = useLocalSearchParams();
  const [location, setLocation] = useState<{
    name: string;
    img: ImageSourcePropType | undefined;
  }>();

  useEffect(() => {
    if (params.name) {
      const currentLocation = locations.find(
        (location) => location.name === params.name
      );
      if (currentLocation) setLocation(currentLocation);
    }
  }, [params]);

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
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

      {/* OPTIONS */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={options}
          contentContainerStyle={{ padding: 40, gap: 20 }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: "/(screens)/home/Destinations",
                params: {
                  categoryId: item.id,
                  location: location?.name,
                  name: item.name,
                },
              }}
            >
              <View style={styles.optionItem}>
                <Text style={styles.optionName}>{item.name.toUpperCase()}</Text>
                <Image
                  source={item.img}
                  style={{ width: "100%", height: "100%", opacity: 0.5 }}
                />
              </View>
            </Link>
          )}
          scrollEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* DESTINATION HEADER */
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },

  /* OPTIONS */
  optionItem: {
    position: "relative",
    height: 130,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#000",
    overflow: "hidden",
    borderRadius: 6,
  },
  optionName: {
    position: "absolute",
    zIndex: 100,
    fontSize: 20,
    width: "100%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    color: "white",
  },
  optionImg: {
    position: "relative",
    height: "100%",
    width: "100%",
    opacity: 0.4,
  },
});
