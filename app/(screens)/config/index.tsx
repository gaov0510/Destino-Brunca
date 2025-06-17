import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "@/hooks/useConfig";
import { Collapsible } from "@/components/Collapsible";

import IconMap from "@/components/Icons/IconMap";
import IconEmail from "@/components/Icons/IconEmail";
import IconPhone from "@/components/Icons/IconPhone";

export default function ConfigScreen() {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const { config, isLoading, updateConfig, changeLanguage } = useAppConfig();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t("loading")}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Sección de Contacto */}
        <Collapsible title={t("contactTitle")}>
          <View style={styles.sectionContent}>
            <View style={styles.contactItem}>
              <IconMap width={20} height={20} fill="#666" />
              <Text style={styles.contactText}>{t("contactAddress")}</Text>
            </View>
            <View style={styles.contactItem}>
              <IconEmail width={20} height={20} fill="#666" />
              <Text style={styles.contactText}>egomezr@uned.ac.cr</Text>
            </View>
            <View style={styles.contactItem}>
              <IconPhone width={20} height={20} fill="#666" />
              <Text style={styles.contactText}>+506 27733013</Text>
            </View>
          </View>
        </Collapsible>

        {/* Sección de Preferencias */}
        <Collapsible
          title={t("preferencesTitle")}
          open={params.section === "language"}
        >
          <Text style={styles.sectionSubtitle}>{t("selectLanguage")}</Text>
          <RadioButton.Group
            onValueChange={changeLanguage}
            value={config.language}
          >
            <View style={styles.radioItem}>
              <RadioButton value="es" />
              <Text style={styles.radioLabel}>{t("spanish")}</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton value="en" />
              <Text style={styles.radioLabel}>{t("english")}</Text>
            </View>
          </RadioButton.Group>

          <View style={styles.sectionContent}>
            {/* Formato de Fecha */}
            <Text style={styles.sectionSubtitle}>{t("dateFormat")}</Text>
            <RadioButton.Group
              onValueChange={(value) => updateConfig({ dateFormat: value })}
              value={config.dateFormat}
            >
              <View style={styles.radioItem}>
                <RadioButton value="mes-dia" />
                <Text style={styles.radioLabel}>{t("monthDayFormat")}</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="dia-mes" />
                <Text style={styles.radioLabel}>{t("dayMonthFormat")}</Text>
              </View>
            </RadioButton.Group>

            {/* Formato de Distancia */}
            <Text style={styles.sectionSubtitle}>{t("distanceFormat")}</Text>
            <RadioButton.Group
              onValueChange={(value) => updateConfig({ distanceFormat: value })}
              value={config.distanceFormat}
            >
              <View style={styles.radioItem}>
                <RadioButton value="kilometros" />
                <Text style={styles.radioLabel}>{t("kilometers")}</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="millas" />
                <Text style={styles.radioLabel}>{t("miles")}</Text>
              </View>
            </RadioButton.Group>

            {/* Formato de Hora */}
            <Text style={styles.sectionSubtitle}>{t("timeFormat")}</Text>
            <RadioButton.Group
              onValueChange={(value) => updateConfig({ timeFormat: value })}
              value={config.timeFormat}
            >
              <View style={styles.radioItem}>
                <RadioButton value="24Horas" />
                <Text style={styles.radioLabel}>{t("24hourFormat")}</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="12Horas" />
                <Text style={styles.radioLabel}>{t("12hourFormat")}</Text>
              </View>
            </RadioButton.Group>
          </View>
        </Collapsible>

        {/* Sección de Notificaciones */}
        <Collapsible title={t("notificationsTitle")}>
          <View style={styles.sectionContent}>
            <View style={styles.checkboxItem}>
              <Checkbox.Item
                label={t("appUpdates")}
                labelStyle={styles.checkboxLabel}
                status={
                  config.notifications.appUpdates ? "checked" : "unchecked"
                }
                onPress={() =>
                  updateConfig({
                    notifications: {
                      ...config.notifications,
                      appUpdates: !config.notifications.appUpdates,
                    },
                  })
                }
                mode="android"
              />
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox.Item
                label={t("newsUpdates")}
                labelStyle={styles.checkboxLabel}
                status={
                  config.notifications.newsUpdates ? "checked" : "unchecked"
                }
                onPress={() =>
                  updateConfig({
                    notifications: {
                      ...config.notifications,
                      newsUpdates: !config.notifications.newsUpdates,
                    },
                  })
                }
                mode="android"
              />
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox.Item
                label={t("contentUpdates")}
                labelStyle={styles.checkboxLabel}
                status={
                  config.notifications.contentUpdates ? "checked" : "unchecked"
                }
                onPress={() =>
                  updateConfig({
                    notifications: {
                      ...config.notifications,
                      contentUpdates: !config.notifications.contentUpdates,
                    },
                  })
                }
                mode="android"
              />
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox.Item
                label={t("recommendations")}
                labelStyle={styles.checkboxLabel}
                status={
                  config.notifications.recommendations ? "checked" : "unchecked"
                }
                onPress={() =>
                  updateConfig({
                    notifications: {
                      ...config.notifications,
                      recommendations: !config.notifications.recommendations,
                    },
                  })
                }
                mode="android"
              />
            </View>
          </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4442",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
  },
  checkboxItem: {
    marginVertical: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#444",
  },
});
