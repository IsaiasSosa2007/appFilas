import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faUser, faBook } from "@fortawesome/free-solid-svg-icons";


export default function Navbar({ navigation }) {
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
        <FontAwesomeIcon icon={faHouse} size={30} color="#000000" />
        <Text style={styles.boton}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonContainer} onPress={() => navigation.navigate("CambiarModo")}>
        <FontAwesomeIcon icon={faBook} size={30} color="#000000" />
        <Text style={styles.boton}>Registros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botonContainer} onPress={() => navigation.navigate("CambiarModo")}>
        <FontAwesomeIcon icon={faUser} size={30} color="#000000" />
        <Text style={styles.boton}>Perfil</Text>
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