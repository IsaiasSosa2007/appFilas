import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MenuAD from "../AdminScrenns/MenuAD";

import { useState } from "react";
export default function Producto({ navigation, productos = [] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text>
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        <Text style={styles.tituloSeccion}>Productos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        >
          {productos.filter((p) => p.agregado).map((producto) => (
              <TouchableOpacity
                key={producto.id}
                style={styles.itemSlider}
                onPress={() => navigation.navigate("Cont")}
              >
                <Image source={producto.imagen} style={styles.imagenSlider} />
                <Text style={styles.textoSlider}>{producto.nombre}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>

      <MenuAD navigation={navigation} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
  },
  header: {
    backgroundColor: "#5D4037",
    padding: 16,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    gap: 6,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: -6,
    marginTop: 50,
  },
  tituloHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: 2,
    fontFamily: "arial",
    marginTop: 50,
  },
  contenido: {
    flex: 1,
    padding: 16,
    backgroundColor: "#D98F0E",
  },
  sliderContainer: {
    marginBottom: 20,
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 16,
    marginTop: 10,
  },

  itemSlider: {
    alignItems: "center",
    marginRight: 20,
  },
  itemSlider: {
    alignItems: "center",
    marginRight: 20,
  },
  imagenSlider: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "white",
  },
  textoSlider: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5D4037",
  },
});
