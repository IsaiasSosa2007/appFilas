import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, Image, TouchableOpacity,} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>

      <View style={styles.selection}>
        <Text style={styles.texto}>¿Hubo fallas?</Text>
      </View>

      <View style={styles.botonContenido}>
        <TouchableOpacity 
          style={[styles.Checkbox, opcionElegida === 'si' && { borderColor: 'red' }]} 
          onPress={() => setOpcionElegida('si')}
        >
          <Text style={styles.botonSi}>Si</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.Checkbox, opcionElegida === 'no' && { borderColor: 'green' }]} 
          onPress={() => {
            setOpcionElegida('no');
            setFallaSeleccionada(null);
          }}
        >
          <Text style={styles.botonNo}>No</Text>
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

      <StatusBar style="auto" />
    </View>
  );
}

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
    marginTop: 50,
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
  Checkbox: {
    backgroundColor: "#ffff",
    width: "25%",
    height: 100,
    borderWidth: 3,
    borderColor: "#5D4037",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botonContenido: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
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
  botonSi: {
    fontSize: 33,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  botonNo: {
    fontSize: 33,
    color: "green",
    margin: 6,
    textAlign: "center",
    fontWeight: "bold",
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