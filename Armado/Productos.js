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
import { FONDO } from "../Componentes/Fondo";

export default function Producto({ navigation, productos = [] }) {
  const irAConteo = (producto) => {
    if (producto.id === 1) {
      navigation.navigate("Cont");
    } else if (producto.id === 2) {
      navigation.navigate("ContVasos");
    } else if (producto.id === 3) {
      navigation.navigate("ContVasosPapel");
    } else if (producto.id === 4) {
      navigation.navigate("ContGlobos");
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        <Text style={styles.tituloSeccion}>PRODUCTOS</Text>

        <View style={styles.grilla}>
          {productos
            .filter((p) => p.agregado)
            .map((producto) => (
              <TouchableOpacity
                key={producto.id}
                style={styles.itemGrilla}
                onPress={() => irAConteo(producto)}
              >
                <Image source={producto.imagen} style={styles.imagenSlider} />
                <Text style={styles.textoSlider} numberOfLines={2}>
                  {producto.nombre}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      <Navbar navigation={navigation} />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FONDO, // Era el string "FONDO"; ahora usa la constante importada
  },
  contenido: {
    flex: 1,
    padding: 16,
  },
  grilla: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 16,
    marginTop: 10,
  },
  itemGrilla: {
    width: "33.33%", // 3 por fila
    alignItems: "center",
    marginBottom: 16,
  },
  imagenSlider: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "white",
  },
  textoSlider: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5D4037",
    textAlign: "center",
  },
});