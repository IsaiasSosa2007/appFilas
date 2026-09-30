import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Perfil from "./assets/perfil.png";
import React from "react";
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
export default function Panel({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>
      <View style={styles.conBotones}>
        <View style={styles.botonWrapper}>
          <TouchableOpacity
            style={styles.admin}
            // onPress={() => navigation.navigate("RedAdmin")}//podriamos cambiarlo por un alert(de momento) para que no se peuda acceder
          >
            <FontAwesome name="user" size={40} color="black" />
          </TouchableOpacity>
          <Text style={styles.botonText}>deshabilitado</Text>
        </View>
        <View style={styles.botonWrapper}>
          <TouchableOpacity
            style={styles.operario}
            onPress={() => navigation.navigate("RedUser")}
          >
            <FontAwesome5 name="users" size={34} color="white" />
          </TouchableOpacity>
          <Text style={styles.botonText}>Operario</Text>
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
  botonWrapper: {
    alignItems: "center",
    marginHorizontal: 18,
    marginVertical: "70%",
  },

  conBotones: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    gap: 40,
  },
  admin: {
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 55,
    borderRadius: 12,
    // backgroundColor: "#e42b2bff",
    backgroundColor: "#515050",
    margin: 7,
  },
  operario: {
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#39a717ff",
    padding: 10,
  },
  botonText: {
    fontSize: 17,
    color: "#000",
    fontWeight: "bold",
  },
  imagenB: {
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 12,
    backgroundColor: "white",
  },
});
