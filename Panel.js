import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserGear, faUsersGear } from "@fortawesome/free-solid-svg-icons";

import Header from "./Componentes/Header";
import { FONDO } from "./Componentes/Fondo";
import { useUsuario } from "./UsuarioContext";

import React from "react";

// A dónde entra cada rol cuando ya tiene la sesión iniciada
const DESTINOS = { operario: "RedUser", supervisor: "RedAdmin" };
const NOMBRES = { operario: "OPERARIO", supervisor: "SUPERVISOR" };

export default function Panel({ navigation }) {
  const { usuario, cargando } = useUsuario();

  const elegirRol = (rol) => {
    // Todavía se está restaurando la sesión guardada
    if (cargando) return;

    // Sin sesión: va al Login de ese rol
    if (!usuario) {
      navigation.navigate("Login", { rol });
      return;
    }

    // Con sesión del mismo rol: entra directo, sin volver a loguearse
    if (usuario.rol === rol) {
      navigation.navigate(DESTINOS[rol]);
      return;
    }

    // Con sesión de otro rol: no puede entrar, primero tiene que cerrar sesión
    Alert.alert(
      "YA INGRESASTE",
      `ENTRASTE COMO ${NOMBRES[usuario.rol] ?? "OTRO ROL"}.\nPARA CAMBIAR DE ROL, CERRÁ LA SESIÓN DESDE TU PERFIL.`
    );
  };

  return (
    <View style={styles.container}>

      <Header />

      <StatusBar style="light" />

      <View style={styles.contenido}>
        <Text style={styles.subtitulo}>SELECCIONE SU ROL</Text>

        <View style={styles.conBotones}>
          {/* Botón Supervisor */}
          <TouchableOpacity
            style={[styles.boton, styles.admin]}
            disabled={cargando}
            activeOpacity={0.8}
            onPress={() => elegirRol("supervisor")}
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
            disabled={cargando}
            activeOpacity={0.8}
            onPress={() => elegirRol("operario")}
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
    backgroundColor: FONDO,
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
    backgroundColor: "#ff0f0f",
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