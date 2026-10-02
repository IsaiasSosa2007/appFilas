import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { obtenerRegistros, borrarRegistros } from "./Registro";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CambiarModo({ navigation }) {
  const insets = useSafeAreaInsets();
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Recarga los registros cada vez que se entra a la pantalla
  useFocusEffect(
    useCallback(() => {
      let activo = true;
      const cargarRegistros = async () => {
        setCargando(true);
        const data = await obtenerRegistros();
        if (activo) {
          setRegistros(data);
          setCargando(false);
        }
      };
      cargarRegistros();
      return () => {
        activo = false;
      };
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTipo}>{item.tipoProduccion}</Text>
        <Text style={styles.cardFechaHora} numberOfLines={1} adjustsFontSizeToFit>
          {item.fecha} - {item.hora}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTexto}>Total de insumos utilizados: {item.totalInsumosUsados} </Text>
        <Text style={styles.cardTexto}>Cantidad de producto final: {item.totalInsumosHechos} </Text>
        <Text style={styles.cardTexto}>Falla: {item.fallaFinal} </Text>
        <Text style={styles.cardTexto}>Supervisor/a: {item.supervisorFinal} </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Registro de Controles</Text>

      <TouchableOpacity
        style={styles.botonBorrar}
        onPress={async () => {
          await borrarRegistros();
          setRegistros([]);
        }}
      >
        <Text style={styles.textoBotonBorrar}>Borrar historial</Text>
      </TouchableOpacity>

      {cargando ? (
        <ActivityIndicator size="large" color="#5D4037" style={{ marginTop: 40 }} />
      ) : registros.length === 0 ? (
        <Text style={styles.vacio}>Todavía no hay controles registrados.</Text>
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}

      <StatusBar style="auto" />

      <View style={[styles.footer,
        {
          paddingBottom: insets.bottom,
          height: 65 + insets.bottom,
        },
      ]}>
          <TouchableOpacity style={styles.botonFooter} 
            onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotonFooter}>← Volver</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
    paddingTop: 60,
  },
  texto: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5D4037",
    textAlign: "center",
    marginBottom: 20,
  },
  vacio: {
    textAlign: "center",
    color: "#5D4037",
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  botonBorrar: {
    alignSelf: "center",
    backgroundColor: "#B71C1C",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoBotonBorrar: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTipo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#5D4037",
  },
  cardFechaHora: {
    fontSize: 12,
    color: "#888",
  },
  cardBody: {
    gap: 2,
  },
  cardTexto: {
    fontSize: 14,
    color: "#333",
  },
  footer: {
    flexDirection: 'row',  
    backgroundColor: 'white',
    borderTopWidth: 1, 
    borderTopColor: '#EEE', 
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // paddingVertical: 30,
    borderTopWidth: 1,
    marginTop: "auto",
  },
  botonFooter: {
    backgroundColor: '#5D4037', 
    paddingVertical: 12, 
    paddingHorizontal: 20,
    borderRadius: 8, 
    alignItems: 'center', 
    flex: 1, 
    marginHorizontal: 5,
  },
  textoBotonFooter: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
});