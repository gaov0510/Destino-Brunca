import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Traducciones
const resources = {
  en: {
    translation: {
      lenguage: "EN",

      news: "News",
      newsEmpty: "Empty",

      destination: "Destinations",
      destinationEmpty: "Empty",

      loading: "Loading...",
      contactTitle: "Contact Information",
      contactAddress: "UNED, Brunca Region, Costa Rica",
      selectLanguage: "Select your preferred language",
      english: "English",
      spanish: "Spanish",

      preferencesTitle: "App Preferences",
      dateFormat: "Date Format",
      monthDayFormat: "Month/Day (MM/DD)",
      dayMonthFormat: "Day/Month (DD/MM)",
      distanceFormat: "Distance Units",
      kilometers: "Kilometers",
      miles: "Miles",
      timeFormat: "Time Format",
      "24hourFormat": "24-hour format",
      "12hourFormat": "12-hour format",

      notificationsTitle: "Notification Settings",
      appUpdates: "App Updates",
      newsUpdates: "News Updates",
      contentUpdates: "Content Updates",
      recommendations: "Recommendations",
    },
  },
  es: {
    translation: {
      lenguage: "ES",

      news: "Noticias",
      newsEmpty: "NO HAY NOTICIAS",

      destination: "Destinos",
      destinationEmpty: "NO HAY DESTINOS",

      loading: "Cargando...",
      contactTitle: "Contacto",
      contactAddress: "UNED, Región Brunca, Costa Rica",
      selectLanguage: "Seleccione su idioma preferido",
      english: "Inglés",
      spanish: "Español",

      preferencesTitle: "Preferencias de Usuario",
      dateFormat: "Formato de Fecha",
      monthDayFormat: "Mes/Día (MM/DD)",
      dayMonthFormat: "Día/Mes (DD/MM)",
      distanceFormat: "Unidades de Distancia",
      kilometers: "Kilómetros",
      miles: "Millas",
      timeFormat: "Formato de Hora",
      "24hourFormat": "Formato 24 horas",
      "12hourFormat": "Formato 12 horas",

      notificationsTitle: "Notificaciones",
      appUpdates: "Actualizaciones de la App",
      newsUpdates: "Actualizaciones de Noticias",
      contentUpdates: "Actualizaciones de Contenido",
      recommendations: "Recomendaciones",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Localization.locale.split('-')[0], // idioma del dispositivo
  fallbackLng: "es", // idioma por defecto
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
