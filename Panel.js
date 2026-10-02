import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserGear, faUsersGear } from "@fortawesome/free-solid-svg-icons";

import Header from "./Componentes/Header";

import React from "react";

export default function Panel({ navigation }) {
  return (
    <View style={styles.container}>

      <Header />

      <StatusBar style="light" />

      <View style={styles.contenido}>
        <Text style={styles.subtitulo}>Seleccione su rol</Text>

        <View style={styles.conBotones}>
          {/* Botón Admin (deshabilitado por ahora) */}
          <TouchableOpacity
            style={[styles.boton, styles.admin]}
            disabled={true}
            activeOpacity={1}
            // onPress={() => navigation.navigate("RedAdmin")}
          >
            <FontAwesomeIcon icon={faUserGear} size={40} color="#ffffff" />
            <Text
              style={styles.botonText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              SUPERVISOR
            </Text>
          </TouchableOpacity>

          {/* Botón Operario */}
          <TouchableOpacity
            style={[styles.boton, styles.operario]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RedUser")}
          >
            <FontAwesomeIcon icon={faUsersGear} size={40} color="#ffffff" />
            <Text
              style={styles.botonText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              OPERARIO
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffb13bff",
  },
  contenido: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  subtitulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,
    textAlign: "center",
  },
  conBotones: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  boton: {
    flex: 1,
    maxWidth: 170,
    height: 130,
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  admin: {
    backgroundColor: "#515050",
  },
  operario: {
    backgroundColor: "#39a717ff",
  },
  botonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});