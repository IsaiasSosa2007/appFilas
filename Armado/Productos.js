import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../Componentes/Header";
import Navbar from "../Componentes/Navbar";

import { useState } from "react";
export default function Producto({ navigation, productos = [] }) {
  return (
    <View style={styles.container}>
      <Header />

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

      <Navbar navigation={navigation} />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
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