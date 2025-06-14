import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Destination } from "@/interface/Destination";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useDestinations from "@/hooks/useDestinations";
import useSearch from "@/hooks/useSearch";

import RenderHTML from "react-native-render-html";
import IconClose from "@/components/Icons/IconClose";
import MapPreview from "@/components/MapPreview";

export default function DestinationDetails() {
  const params = useLocalSearchParams();
  const destinations = useDestinations();
  const searchData = useSearch();
  const [containerWidth, setContainerWidth] = useState(0);
  const [destination, setDestination] = useState<Destination>();

  useEffect(() => {
    console.log(params.item);

    if (params.index) {
      const data = destinations.data.find((_, i) => i === Number(params.index));
      if (data) setDestination(data);
    }

    if (params.apiId) {
      const data = searchData.data.find((data) => data.id === params.apiId);
      if (data) setDestination(data);
    }
  }, [destination]);

  const safeText = (text?: string | null) =>
    text && text.trim().length > 0 ? text : "-";

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.locationHead}>
        <Text style={styles.locationName}>
          {safeText(destination?.title?.toUpperCase())}
        </Text>
        <View style={styles.locationImg}>
          {destination?.images?.[1]?.url ? (
            <Image
              src={destination.images[1].url}
              style={{ width: "100%", height: "100%", opacity: 0.5 }}
            />
          ) : null}
          <TouchableOpacity
            style={styles.locationCloseBtn}
            onPress={() => router.back()}
          >
            <IconClose fill="white" width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={styles.content}
        onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      >
        {destination?.body && (
          <RenderHTML
            contentWidth={containerWidth}
            source={{ html: destination.body }}
            baseStyle={styles.destinationDescription}
          />
        )}

        {destination?.telefono && destination?.email && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos de contacto:</Text>
            <Text>Teléfono: {safeText(destination?.telefono?.[1])}</Text>
            <Text>Correo: {safeText(destination?.email)}</Text>
          </View>
        )}

        {destination?.canton && destination?.distrito && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ubicación:</Text>
            <Text>Cantón: {safeText(destination?.canton)}</Text>
            <Text>Distrito: {safeText(destination?.distrito)}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horario:</Text>
          <Text>
            {safeText(destination?.horario?.[1]?.tipo)}:{" "}
            {safeText(destination?.horario?.[1]?.hora)}
          </Text>
          <Text>
            {safeText(destination?.horario?.[2]?.tipo)}:{" "}
            {safeText(destination?.horario?.[2]?.hora)}
          </Text>
        </View>

        {destination?.montaña.title &&
          destination?.montaña.description &&
          destination?.montaña.canton &&
          destination?.montaña.distrito && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Montaña:</Text>
              <Text>Título: {safeText(destination?.montaña?.title)}</Text>
              <Text>
                Descripción: {safeText(destination?.montaña?.description)}
              </Text>
              <Text>Cantón: {safeText(destination?.montaña?.canton)}</Text>
              <Text>Distrito: {safeText(destination?.montaña?.distrito)}</Text>
            </View>
          )}

        {destination?.playa?.title &&
          destination?.playa?.description &&
          destination?.playa?.canton &&
          destination?.playa?.distrito && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Playa:</Text>
              <Text>Título: {safeText(destination?.playa?.title)}</Text>
              <Text>
                Descripción: {safeText(destination?.playa?.description)}
              </Text>
              <Text>Cantón: {safeText(destination?.playa?.canton)}</Text>
              <Text>Distrito: {safeText(destination?.playa?.distrito)}</Text>
            </View>
          )}

        {destination && Object.values(destination.servicios).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios:</Text>
            {destination?.servicios ? (
              <FlatList
                data={Object.values(destination.servicios)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text>{item}</Text>}
                scrollEnabled={false}
              />
            ) : (
              <Text>No hay servicios registrados.</Text>
            )}
          </View>
        )}

        {destination && Object.values(destination.tipo_alimentos).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alimentos:</Text>
            {destination?.tipo_alimentos ? (
              <FlatList
                data={Object.values(destination.tipo_alimentos)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text>{item}</Text>}
                scrollEnabled={false}
              />
            ) : (
              <Text>No hay tipos de alimentos registrados.</Text>
            )}
          </View>
        )}

        {destination?.map?.lat && destination?.map?.lon && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mapa:</Text>
            <MapPreview
              latitude={Number(destination?.map.lat)}
              longitude={Number(destination?.map.lon)}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  locationHead: {
    position: "relative",
    height: 200,
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
    borderRadius: 50,
    backgroundColor: "#0004",
  },
  locationName: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    padding: 20,
    width: "100%",
    fontSize: 25,
    fontWeight: "500",
    color: "white",
  },
  locationImg: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },
  destinationTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  destinationDescription: {
    color: "black",
    fontSize: 16,
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#222",
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
