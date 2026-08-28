import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Home from "../assets/Home.png";
import Perfil from "../assets/perfil.png";
//import { text } from 'express';

export default function Fallas({ navigation, route }) {
  const [fallaSeleccionada, setFallaSeleccionada] = useState(null);
  const [mostrarFallas, setMostrarFallas] = useState(false);
  //const {productos, productosSeleccionados } = route.params;

  const fallas = [
    { id: 1, nombre: "Roto", imagen: require("../assets/Roto.jpg") },
    { id: 2, nombre: "Faltante", imagen: require("../assets/Falla.png") },
    { id: 3, nombre: "Sobrante", imagen: require("../assets/agregar-producto.png"), },
    { id: 4, nombre: "Otro", imagen: require("../assets/Otro.jpg") },
  ];
  function Confirmar() {
    Alert.alert(
      "¿Seguro querés finalizar?",
      "¿Querés continuar con la acción?",
      [
        {
          text: "No",
          onPress: () => Alert.alert("Cancelado!!"),
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () =>
            navigation.navigate("ComprobanteAR", {
              productos: route.params.productos,
              productosSeleccionados: route.params.productosSeleccionados,
              totalBengalas: route.params.totalBengalas,
              falla: { nombre: "No se seleccionó ninguna falla" },
            }),
        },
      ],
      { cancelable: false },
    );
  }

  function Mostrar() {
    setMostrarFallas(true);
    setMostrarFallas(fallas.nombre);
    setMostrarFallas(true);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text>
      </View>
      <View style={styles.selection}>
        <Text style={styles.texto}>¿Hubo fallas?</Text>
      </View>
      <View style={styles.botonContenido}>
        <TouchableOpacity style={styles.Checkbox} onPress={Mostrar}>
          <Text style={styles.botonSi}>Si</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Checkbox} onPress={Confirmar}>
          <Text style={styles.botonNo}>No</Text>
        </TouchableOpacity>
      </View>

      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////
      {mostrarFallas && (
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
        
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonOne} onPress={Confirmar}>
          <Text style={{ color: "white", fontFamily: "arial", fontSize: 20 }}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonTwo}
          onPress={() =>
            navigation.navigate("ComprobanteAR", {
              productos: route.params.productos,
              productosSeleccionados: route.params.productosSeleccionados,
              totalBengalas: route.params.totalBengalas,
              falla: fallaSeleccionada,
            })
          }
        >
          <Text style={{ color: "white", fontFamily: "arial", fontSize: 20 }}>
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      )}
      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////////////////////////


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
    fontFamily: "arial",
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
    fontFamily: "arial",
    color: "#5D3740",
    fontWeight: "bold",
  },
  Checkbox: {
    backgroundColor: "#ffff",
    width: '25%',
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
  checkmark: {
    color: "white",
    fontWeight: "bold",
    marginRight: 390,
  },
  contenido: {
    marginTop: 110,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  fallasSi:{
    flexDirection:"column",
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
    marginTop: 150,
  },
  boton: {
    fontFamily: "arial",
    fontSize: 15,
    textAlign: "center",
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
});
