import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PropsWithChildren, useState } from "react";
import { IconSymbol } from "./Icons/IconSymbol.ios";
import { useTheme } from "react-native-paper";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: theme.dark ? "#EEE" : "#aaa",
        },
      ]}
    >
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Text
          style={{ fontSize: 20, color: theme.dark ? "#D0D0D0" : "#444444" }}
        >
          {title}
        </Text>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color="black"
          style={{ transform: [{ rotate: isOpen ? "-90deg" : "90deg" }] }}
        />
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 6,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerText: {
    fontWeight: "600",
  },
  content: {
    paddingVertical: 10,
    marginBottom: 20,
  },
});
