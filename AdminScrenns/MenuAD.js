import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Perfil from "../assets/perfil.png";
import Home from "../assets/Home.png";

export default function MenuAD({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: insets.bottom,
          height: 65 + insets.bottom,
        },
      ]}
    >
      <TouchableOpacity style={styles.botonContainer} onPress={() => navigation.navigate("Panel")}>
        <Image source={Home} style={{ width: 40, height: 35 }} />
        <Text style={styles.boton}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonContainer} onPress={() => navigation.navigate("CambiarModo")}>
        <Image source={Perfil} style={{ width: 40, height: 35 }} />
        <Text style={styles.boton}>Registros</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  botonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  boton: {
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
    zIndex: 20,
  },
});