import { Linking, Platform, View } from "react-native";
import { WebView } from "react-native-webview";

const openInMaps = (latitude: number, longitude: number) => {
  const url = Platform.select({
    ios: `maps:0,0?q=${latitude},${longitude}`,
    android: `geo:0,0?q=${latitude},${longitude}`,
  });
  if (url) Linking.openURL(url);
};

interface Props {
  latitude?: number;
  longitude?: number;
}

export default function MapPreview({
  latitude = -34.6037,
  longitude = -58.3816,
}: Props) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <WebView
        style={{
          height: 200,
          width: "100%",
        }}
        source={{
          uri: `https://www.openstreetmap.org/export/embed.html?bbox=${
            longitude - 0.01
          },${latitude - 0.01},${longitude + 0.01},${
            latitude + 0.01
          }&layer=mapnik&marker=${latitude},${longitude}`,
        }}
        onTouchEnd={() => openInMaps(latitude, longitude)}
      />
    </View>
  );
}
