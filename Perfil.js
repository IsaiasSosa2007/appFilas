import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserGear, faUsersGear } from "@fortawesome/free-solid-svg-icons";

import Header from "./Componentes/Header";
import Navbar from "./Componentes/Navbar";
import { FONDO } from "./Componentes/Fondo";
import { useUsuario } from "./UsuarioContext";

// Mismos colores e íconos que usás en el Panel
const ROLES = {
  operario: { etiqueta: "OPERARIO", icono: faUsersGear, color: "#39a717" },
  supervisor: { etiqueta: "SUPERVISOR", icono: faUserGear, color: "#ff0f0f" },
};

export default function Perfil({ navigation }) {
  const { usuario: usuarioContext, setUsuario } = useUsuario();
  const usuario = usuarioContext ?? { nombre: "SIN NOMBRE", rol: "operario" };
  const rol = ROLES[usuario.rol] ?? ROLES.operario;

  const cerrarSesion = () => {
    setUsuario(null);
    // Limpia el historial y vuelve al Panel para elegir rol de nuevo
    navigation.reset({ index: 0, routes: [{ name: "Panel" }] });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header />

      <View style={styles.contenido}>
        <View style={[styles.avatar, { backgroundColor: rol.color }]}>
          <FontAwesomeIcon icon={rol.icono} size={56} color="#FFF" />
        </View>

        <Text style={[styles.rol, { color: rol.color }]}>{rol.etiqueta}</Text>
        <Text style={styles.nombre}>{usuario.nombre}</Text>

        <TouchableOpacity
          style={styles.botonSalir}
          activeOpacity={0.8}
          onPress={cerrarSesion}
        >
          <Text style={styles.botonSalirTexto}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>

      <Navbar />
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
    paddingBottom: 90, // espacio para que el Navbar fijo no tape el contenido
    gap: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  rol: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  nombre: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  botonSalir: {
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: "#1F4E79",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  botonSalirTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F4E79",
  },
});