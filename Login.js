import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUsuario } from "./UsuarioContext";

import Header from "./Componentes/Header"; // revisar ruta según tu carpeta
import { FONDO } from "./Componentes/Fondo";

// Metro necesita rutas fijas en el require, por eso se arma este mapa.
// Revisá las rutas de los .json según dónde los tengas.
const CONFIG = {
  operario: {
    titulo: "OPERARIO",
    datos: require("./operario.json"),
    destino: "RedUser",
  },
  supervisor: {
    titulo: "SUPERVISOR",
    datos: require("./supervisor.json"),
    destino: "RedAdmin",
  },
};

// Quita tildes y pasa a minúsculas
const normalizar = (texto) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

// Acepta tanto [ {nombre} ] como { operario: [ {nombre} ] }
const obtenerLista = (datos, rol) =>
  Array.isArray(datos) ? datos : datos[rol] ?? [];

export default function Login({ navigation, route }) {
  const rol = route?.params?.rol ?? "operario";
  const { titulo, datos, destino } = CONFIG[rol];

  const usuarios = useMemo(
    () => obtenerLista(datos, rol).map((p) => ({ nombre: p.nombre, rol })),
    [datos, rol]
  );

  const [busqueda, setBusqueda] = useState("");

  const coincidencias = useMemo(() => {
    const palabras = normalizar(busqueda).split(/\s+/).filter(Boolean);
    if (palabras.length === 0) return [];
    return usuarios.filter((u) => {
      const nombre = normalizar(u.nombre);
      return palabras.every((p) => nombre.includes(p));
    });
  }, [busqueda, usuarios]);


  const { setUsuario } = useUsuario();
  const ingresar = (usuario) => {
    setBusqueda("");
    setUsuario(usuario);
    navigation.replace(destino);
  };

  const hayTexto = busqueda.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" />
      <Header />

      <ScrollView
        contentContainerStyle={styles.cuerpo}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>INGRESO DE {titulo}</Text>
        <Text style={styles.ayuda}>
          ESCRIBÍ TU NOMBRE O APELLIDO Y ELEGÍ TU PERFIL DE LA LISTA.
        </Text>

        <TextInput
          style={styles.input}
        //   placeholder="Ej: Federico García"
        //   placeholderTextColor="#8A9BAD"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="search"
        />

        {coincidencias.map((u) => (
          <TouchableOpacity
            key={u.nombre}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => ingresar(u)}
          >
            <Text style={styles.itemNombre}>{u.nombre}</Text>
          </TouchableOpacity>
        ))}

        {hayTexto && coincidencias.length === 0 && (
          <Text style={styles.vacio}>
            NO ENCONTRAMOS ESE NOMBRE. REVISÁ CÓMO LO ESCRIBISTE O PEDILE A TU SUPERVISOR QUE TE CARGUE.
          </Text>
        )}

        <TouchableOpacity
          style={styles.volver}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.volverTexto}>CAMBIAR DE ROL</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: FONDO,
  },
  cuerpo: {
    padding: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F4E79",
    marginTop: 10,
  },
  ayuda: {
    fontSize: 14,
    color: "#4A5B6C",
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#1F4E79",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#14202B",
  },
  item: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#1F4E79",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#14202B",
  },
  vacio: {
    fontSize: 14,
    color: "#8A3B3B",
    lineHeight: 20,
    marginTop: 6,
  },
  volver: {
    alignSelf: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
  volverTexto: {
    fontSize: 15,
    color: "#1F4E79",
    fontWeight: "600",
  },
});