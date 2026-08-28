import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Perfil from "./assets/perfil.png";
import Home from "./assets/Home.png";
import MenuAD from "./AdminScrenns/MenuAD";

export default function RedUser({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/Logo.png")} style={styles.logo} />
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text>
      </View>
      <View style={styles.selection}>
        <Text style={styles.titulo}>Seleccionar</Text>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 150,
          top: 40,
        }}
      >
        <TouchableOpacity
          style={styles.opcion1}
          onPress={() => navigation.navigate("Productos")}
        >
          <FontAwesome5 name="tools" size={45} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opcion2}
          onPress={() => navigation.navigate("Comidas")}
        >
          <MaterialIcons name="bakery-dining" size={70} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opcion3}
          onPress={() => navigation.navigate("Dulces")}
        >
          <FontAwesome6 name="jar" size={45} color="black" />
        </TouchableOpacity>
      </View>

      <MenuAD navigation={navigation} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D98F0E",
    alignItems: "center",
    justifyContent: "center",
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
  header: {
    backgroundColor: "#5D4037",
    padding: 16,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: "100%",
    height: 150,
    bottom: "20%",
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
  opcion1: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  opcion2: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  opcion3: {
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 15,
  },
  selection: {
    width: 400,
    height: 45,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    bottom: 90,
    fontSize: 20,
  },
  titulo: {
    fontFamily: "arial",
    fontSize: 26,
    color: "#5D4037",
    fontWeight: "700",
  },
  boton: {
    fontFamily: "arial",
    fontSize: 15,
    textAlign: "center",
  },
});
