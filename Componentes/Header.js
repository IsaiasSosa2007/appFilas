import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.fila}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        {/*revisar ruta dependiendo la carpeta*/}
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>

      <Text style={styles.leyenda}>
        Fundación para la Inclusión Laboral y el Apoyo Social
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5D4037",
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  tituloHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: 2,
    fontFamily: "arial",
  },
  leyenda: {
    width: "85%",
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    lineHeight: 20,
  },
});