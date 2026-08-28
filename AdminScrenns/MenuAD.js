import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Perfil from "../assets/perfil.png";
import Home from "../assets/Home.png";

export default function MenuAD({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("Panel")}>
        <Image source={Home} style={{ width: 40, height: 35 }} />
        <Text style={styles.boton}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CambiarModo")}>
        <Image source={Perfil} style={{ width: 40, height: 35 }} />
        <Text style={styles.boton}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 800,
    width: "100%",
    height: 115,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 5,
  },
});
