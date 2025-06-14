import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IconMap from "@/components/Icons/IconMap";
import IconEmail from "@/components/Icons/IconEmail";
import IconPhone from "@/components/Icons/IconPhone";

const STORAGE_KEY = "userPreferences";

export default function Config() {
  const [group1, setGroup1] = useState("mes-dia");
  const [group2, setGroup2] = useState("millas");
  const [group3, setGroup3] = useState("12Horas");

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(true);

  // Cargar preferencias al montar el componente
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue) {
          const prefs = JSON.parse(jsonValue);
          setGroup1(prefs.group1 || "mes-dia");
          setGroup2(prefs.group2 || "millas");
          setGroup3(prefs.group3 || "12Horas");

          setChecked1(prefs.checked1 ?? false);
          setChecked2(prefs.checked2 ?? true);
          setChecked3(prefs.checked3 ?? true);
          setChecked4(prefs.checked4 ?? true);
        }
      } catch (e) {
        console.error("Error cargando preferencias:", e);
      }
    };
    loadPreferences();
  }, []);

  // Guardar preferencias al cambiar cualquier valor
  useEffect(() => {
    const savePreferences = async () => {
      try {
        const prefs = {
          group1,
          group2,
          group3,
          checked1,
          checked2,
          checked3,
          checked4,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      } catch (e) {
        console.error("Error guardando preferencias:", e);
      }
    };
    savePreferences();
  }, [group1, group2, group3, checked1, checked2, checked3, checked4]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: "#4442",
      }}
    >
      <View style={{ marginVertical: 60 }}>
        <Collapsible title="Contactos">
          <View style={{ gap: 15, paddingHorizontal: 16 }}>
            <View style={styles.contactItem}>
              <IconMap width={20} height={20} />
              <Text>Uned, región brunca, costa rica</Text>
            </View>
            <View style={styles.contactItem}>
              <IconEmail width={20} height={20} />
              <Text>egomezr@uned.ac.cr</Text>
            </View>
            <View style={styles.contactItem}>
              <IconPhone width={20} height={20} />
              <Text>+506 27733013</Text>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="Preferencias de usuario">
          <View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.preferenceHeader}>Formato de fecha</Text>
              <RadioButton.Group onValueChange={setGroup1} value={group1}>
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="Mes/Día (e.g. 05/28)"
                  value="mes-dia"
                />
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="Día/Mes (e.g. 30/12)"
                  value="dia-mes"
                />
              </RadioButton.Group>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={styles.preferenceHeader}>Formato de distancia</Text>
              <RadioButton.Group onValueChange={setGroup2} value={group2}>
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="Millas (e.g. 50mi)"
                  value="millas"
                />
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="Kilometros (e.g. 80km)"
                  value="kilometros"
                />
              </RadioButton.Group>
            </View>
            <View>
              <Text style={styles.preferenceHeader}>Formato de tiempo</Text>
              <RadioButton.Group onValueChange={setGroup3} value={group3}>
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="12 Horas (e.g. 2:00 pm)"
                  value="12Horas"
                />
                <RadioButton.Item
                  style={{ height: 35 }}
                  label="24 Horas (e.g. 16:00 pm)"
                  value="24Horas"
                />
              </RadioButton.Group>
            </View>
          </View>
        </Collapsible>

        <Collapsible title="Notificaciones">
          <View>
            <Checkbox.Item
              label="Actualizaciones de la App"
              style={{ flexDirection: "row-reverse" }}
              status={checked1 ? "checked" : "unchecked"}
              onPress={() => setChecked1(!checked1)}
            />
            <Checkbox.Item
              label="Actualización de Noticias"
              style={{ flexDirection: "row-reverse" }}
              status={checked2 ? "checked" : "unchecked"}
              onPress={() => setChecked2(!checked2)}
            />
            <Checkbox.Item
              label="Actualizciones del Contenido"
              style={{ flexDirection: "row-reverse" }}
              status={checked3 ? "checked" : "unchecked"}
              onPress={() => setChecked3(!checked3)}
            />
            <Checkbox.Item
              label="Recomendaciones"
              style={{ flexDirection: "row-reverse" }}
              status={checked4 ? "checked" : "unchecked"}
              onPress={() => setChecked4(!checked4)}
            />
          </View>
        </Collapsible>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  preferenceHeader: {
    fontWeight: "600",
  },
});
