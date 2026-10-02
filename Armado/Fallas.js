import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Image, TouchableOpacity,} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../Componentes/Header";


import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

export default function Fallas({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [fallaSeleccionada, setFallaSeleccionada] = useState(null);
  const [opcionElegida, setOpcionElegida] = useState(null);

  const fallas = [
    { id: 1, nombre: "Roto", imagen: require("../assets/Roto.jpg") },
    { id: 2, nombre: "Faltante", imagen: require("../assets/Falla.png") },
    { id: 3, nombre: "Sobrante", imagen: require("../assets/agregar-producto.png") },
    { id: 4, nombre: "Otro", imagen: require("../assets/Otro.jpg") },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.selection}>
        <Text style={styles.texto}>¿Hubo fallas?</Text>
      </View>

      <View style={styles.botonContenido}>
        <TouchableOpacity
          style={[
            styles.opcionBtn,
            styles.opcionSi,
            opcionElegida === 'si' && styles.opcionSiActiva,
            opcionElegida === 'no' && styles.opcionApagada,
          ]}
          activeOpacity={0.8}
          onPress={() => setOpcionElegida('si')}
        >
          <FontAwesomeIcon
            icon={faThumbsDown}
            size={44}
            color={opcionElegida === 'si' ? '#FFFFFF' : '#D32F2F'}
          />
          <Text
            style={[
              styles.opcionTexto,
              { color: opcionElegida === 'si' ? '#FFFFFF' : '#D32F2F' },
            ]}
          >
            SÍ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcionBtn,
            styles.opcionNo,
            opcionElegida === 'no' && styles.opcionNoActiva,
            opcionElegida === 'si' && styles.opcionApagada,
          ]}
          activeOpacity={0.8}
          onPress={() => {
            setOpcionElegida('no');
            setFallaSeleccionada(null);
          }}
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            size={44}
            color={opcionElegida === 'no' ? '#FFFFFF' : '#2E7D32'}
          />
          <Text
            style={[
              styles.opcionTexto,
              { color: opcionElegida === 'no' ? '#FFFFFF' : '#2E7D32' },
            ]}
          >
            NO
          </Text>
        </TouchableOpacity>
      </View>

      {opcionElegida === 'si' && (
        <View style={styles.fallasSi}>
          <View style={styles.contenido}>
            {fallas.map((falla) => (
              <TouchableOpacity
                key={falla.id}
                onPress={() => setFallaSeleccionada(falla)}
                style={{
                  borderWidth: fallaSeleccionada?.id === falla.id ? 2 : 0,
                  borderColor: "red",
                  borderRadius: 12,
                  padding: 6,
                  marginHorizontal: 6,
                  alignItems: "center",
                }}
              >
                <Image source={falla.imagen} style={styles.fallaImg} />
                <Text style={styles.fallaNombre}>{falla.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {opcionElegida !== null && (
        <View style={styles.botones}>
          <TouchableOpacity 
            style={styles.botonOne} 
            onPress={() => {
              setOpcionElegida(null);
              setFallaSeleccionada(null);
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botonTwo}
            onPress={() =>
              navigation.navigate("ComprobanteAR", {
                productos: route.params?.productos,
                productosSeleccionados: route.params?.productosSeleccionados,
                falla: opcionElegida === 'si' && fallaSeleccionada 
                  ? fallaSeleccionada 
                  : { nombre: "No se seleccionó ninguna falla" },
                  totalBengalas: route.params?.totalBengalas,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 20 }}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.volverContainer}>
        {/* <TouchableOpacity
          style={styles.botonVolver}
          onPress={() =>
            navigation.navigate("Cont", {
              productos: route.params?.productos,
              productosSeleccionados: route.params?.productosSeleccionados,
              totalBengalas: route.params?.totalBengalas,
            })
          }
        >
          <Text style={styles.textoVolver}>← Volver</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
            style={[styles.botonVolver,
              {
          paddingBottom: insets.bottom-10,
          height: 35 + insets.bottom,
        },
            ]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textoVolver}>← Volver</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
  },
  selection: {
    marginTop: 12,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  texto: {
    fontSize: 32,
    color: "#5D3740",
    fontWeight: "bold",
  },
  botonContenido: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  opcionBtn: {
    width: "40%",
    height: 130,
    borderRadius: 20,
    borderWidth: 4,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  opcionSi: {
    borderColor: "#D32F2F",
  },
  opcionSiActiva: {
    backgroundColor: "#D32F2F",
  },
  opcionNo: {
    borderColor: "#2E7D32",
  },
  opcionNoActiva: {
    backgroundColor: "#2E7D32",
  },
  opcionApagada: {
    opacity: 0.5,
  },
  opcionTexto: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  contenido: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  fallasSi: {
    flexDirection: "column",
  },
  fallaImg: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  fallaNombre: {
    marginTop: 8,
    color: "#5D3740",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  botonOne: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonTwo: {
    backgroundColor: "#279927ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  volverContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20, 
  },
  botonVolver: {
    backgroundColor: "#5D4037",
    width: "80%",
    alignSelf: "center",
    // paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoVolver: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});