import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faScrewdriverWrench, faPizzaSlice, faJar, faBreadSlice } from "@fortawesome/free-solid-svg-icons";

import Header from "./Componentes/Header";
import Navbar from "./Componentes/Navbar";

export default function RedUser({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.centro}>
        <View style={styles.selection}>
          <Text style={styles.titulo}>Seleccionar</Text>
        </View>

        <View style={styles.opciones}>
          {/* ARMADO */}
          <TouchableOpacity
            style={[styles.opcionBase, styles.opcion1]}
            onPress={() => navigation.navigate("Productos")}
          >
            <View style={styles.iconoContainer}>
              <FontAwesomeIcon icon={faScrewdriverWrench} size={40} color="#000000" />
            </View>
            <Text style={[styles.textoOpcion, { color: "#000000" }]}>ARMADO</Text>
          </TouchableOpacity>

          {/* PANADERÍA */}
          <TouchableOpacity
            style={[styles.opcionBase, styles.opcion2]}
            // onPress={() => navigation.navigate("Comidas")}
          >
            <View style={styles.iconoContainer}>
              <FontAwesomeIcon icon={faPizzaSlice} size={40} color="#ffffff" />
            </View>
            <Text style={[styles.textoOpcion, { color: "#ffffff" }]}>PANADERÍA</Text>
          </TouchableOpacity>

          {/* DULCES */}
          <TouchableOpacity
            style={[styles.opcionBase, styles.opcion3]}
            // onPress={() => navigation.navigate("Dulces")}
          >
            <View style={styles.iconoContainer}>
              <FontAwesomeIcon icon={faJar} size={40} color="#ffffff" />
            </View>
            <Text style={[styles.textoOpcion, { color: "#ffffff" }]}>DULCES</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Navbar navigation={navigation} />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
    alignItems: "center",
  },
  cont: {
    position: "absolute",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderRadius: 12,
    width: 90,
    height: 30,
  },
  centro: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  selection: {
    width: "90%",
    maxWidth: 400,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titulo: {
    fontFamily: "arial",
    fontSize: 26,
    color: "#5D4037",
    fontWeight: "700",
  },
  opciones: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  opcionBase: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    height: 70,
    borderRadius: 16,
    paddingHorizontal: 24,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconoContainer: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textoOpcion: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  opcion1: {
    backgroundColor: "#f5f5f5",
  },
  opcion2: {
    backgroundColor: "#515050",
  },
  opcion3: {
    backgroundColor: "#515050",
  },
  boton: {
    fontFamily: "arial",
    fontSize: 15,
    textAlign: "center",
  },
});