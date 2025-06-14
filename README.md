# Documentación

### Instalacion

```bash
npm install
```

### Ejecutar entorno de desarrollo en Adnroid

1. Conectar dispositivo o iniciar emulador con Android Studio

2. Limpiamos si es necesario

```bash
  cd android
  ./gradlew clean
  cd ..
```

3. Ejecutamos en Android

```bash
  npm run android
```

### Contruir APK de prueba

1. Generamos la carpeta Adndroid/iOS

```bash
  npx expo prebuild
```

2. Generamos el APK de prueba

```bash
  cd android
  ./gradlew assembleDebug
```

Deberia generarse en _"android/app/build/outputs/apk/debug/app-debug.apk"_
