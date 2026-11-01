import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import DotsLogoLoader from "./Componentes/Animacion";

export default function Splash({ navigation }) {
  const irAlPanel = useCallback(() => {
    // pausa corta para que el logo quede quieto antes de pasar
    setTimeout(() => navigation.replace("Panel"), 500); // pantalla a la que se redirige luego de la animación
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <DotsLogoLoader size={180} onFinish={irAlPanel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});