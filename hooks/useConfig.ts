import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const CONFIG_KEY = 'app-configuration';

const defaultConfig = {
  language: 'es', // Idioma por defecto
  dateFormat: 'mes-dia',
  distanceFormat: 'kilometros',
  timeFormat: '24Horas',
  notifications: {
    appUpdates: false,
    newsUpdates: true,
    contentUpdates: true,
    recommendations: true,
  },
};

export const useAppConfig = () => {
  const { i18n } = useTranslation();
  const [config, setConfig] = useState(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar configuración al iniciar
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await AsyncStorage.getItem(CONFIG_KEY);
        if (savedConfig) {
          const parsedConfig = JSON.parse(savedConfig);
          setConfig(parsedConfig);
          
          // Aplicar el idioma guardado
          await i18n.changeLanguage(parsedConfig.language);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading config:', error);
        setIsLoading(false);
      }
    };
    
    loadConfig();
  }, []);

  // Guardar configuración cuando cambia
  useEffect(() => {
    if (!isLoading) {
      const saveConfig = async () => {
        try {
          await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
          
          // Actualizar idioma en i18n si cambió
          if (i18n.language !== config.language) {
            await i18n.changeLanguage(config.language);
          }
        } catch (error) {
          console.error('Error saving config:', error);
        }
      };
      saveConfig();
    }
  }, [config]);

  // Actualizar configuración parcial
  const updateConfig = (updates: any) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  // Cambiar idioma específicamente
  const changeLanguage = async (language: any) => {
    updateConfig({ language });
  };

  return {
    config,
    isLoading,
    updateConfig,
    changeLanguage,
    availableLanguages: ['es', 'en'],
  };
};