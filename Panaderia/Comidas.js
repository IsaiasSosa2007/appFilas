import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Navbar from "../Componentes/Navbar";

const Comidas = ({ navigation, comidas = [] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text>
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        <Text style={styles.tituloSeccion}>Comidas</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        >
          {comidas
            .filter((c) => c.agregada)
            .map((comida) => (
              <TouchableOpacity
                key={comida.id}
                style={styles.itemSlider}
                onPress={() => navigation.navigate(`${comida.nombre}Receta`)}
              >
                <Image source={comida.imagen} style={styles.imagenSlider} />
                <Text style={styles.textoSlider}>{comida.nombre}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </ScrollView>

      <MenuAD navigation={navigation} />
    </View>
  );
};

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
  subtituloHeader: {
    fontSize: 12,
    color: "#ECEFF1",
    marginTop: 4,
  },
  contenido: {
    flex: 1,
    padding: 16,
    backgroundColor: "#D98F0E",
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 16,
    marginTop: 10,
  },
  sliderContainer: {
    marginBottom: 20,
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
  },
  textoSlider: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5D4037",
  },
  textoActivo: {
    fontWeight: "bold",
  },
});

export default Comidas;
