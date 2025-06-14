import { Slot, useRouter, usePathname, Href } from "expo-router";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  Text,
} from "react-native";

import IconHome from "@/components/Icons/IconHome";
import IconNews from "@/components/Icons/IconNotice";
import IconConfig from "@/components/Icons/IconConfig";
import IconSearch from "@/components/Icons/IconSearch";

interface Tab {
  route: Href;
  IconComponent: React.ComponentType<{
    size?: number;
    fill?: string;
    stroke?: string;
  }>;
  fill?: boolean;
  stroke?: boolean;
}

const tabs: Tab[] = [
  {
    route: "/news",
    IconComponent: IconNews,
    fill: true,
  },
  {
    route: "/home",
    IconComponent: IconHome,
    fill: true,
  },
  {
    route: "/config",
    IconComponent: IconConfig,
    fill: true,
  },
];

export default function CustomLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const getIsActive = (partialRoute: string) => {
    console.log(pathname, partialRoute, pathname === partialRoute);
    return pathname.includes(partialRoute);
  };
  const getIconColor = (isActive: boolean) => (isActive ? "#888" : "#000");

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: 80,
          paddingVertical: 10,
          paddingHorizontal: 30,
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        {pathname !== "/config" ? (
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.push("/(screens)/config")}
          >
            <Text style={styles.buttonText}>ES {">"}</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[styles.circleButton, { backgroundColor: "transparent" }]}
          ></View>
        )}
        <Image
          source={require("@/assets/images/adaptive-icon.png")}
          style={{ height: 80, width: 100 }}
          resizeMode="contain"
        />
        {pathname !== "/home/Search" ? (
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.push("/(screens)/home/Search")}
          >
            <IconSearch fill="black" size={25} strokeWidth={1.6} />
          </TouchableOpacity>
        ) : (
          <View
            style={[styles.circleButton, { backgroundColor: "transparent" }]}
          ></View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      <View style={styles.tabBar}>
        {tabs.map(({ route, IconComponent, fill, stroke }, index) => {
          const isActive = getIsActive(route as string);
          return (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
                gap: 5,
                height: "100%",
                padding: 10,
                paddingHorizontal:
                  require("react-native").Dimensions.get("window").width < 400
                    ? 4
                    : 6,
              }}
              onPress={() => router.push(route)}
            >
              <View
                key={route as string}
                style={[
                  {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                  },
                ]}
              >
                <IconComponent
                  size={35}
                  fill={fill ? getIconColor(isActive) : undefined}
                  stroke={stroke ? getIconColor(isActive) : undefined}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#2222",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 15,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 70,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "white",
  },
});
