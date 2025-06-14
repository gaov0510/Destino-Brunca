import { ActivityIndicator, Text, View } from "react-native";

interface Props {
  opaque?: boolean;
  fixed?: boolean;
}

export default function Loading({ opaque, fixed }: Props) {
  return (
    <View
      style={{
        position: fixed ? "fixed" : "absolute",
        zIndex: 2000,
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: opaque ? "white" : "#0004",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
