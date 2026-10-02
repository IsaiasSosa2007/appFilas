import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";



export default function PerfilAD({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Perfil</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate("RedUser")}
      >
        <Text style={{ color: "white" }}>Cambiar a modo operario</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
  {/*      <TouchableOpacity onPress={() => navigation.navigate("PerfilAD")}>
         <Image source={Home} style={{ width: 40, height: 35 }} />  
          <Text>Inicio</Text>
        </TouchableOpacity>
/*}
{/* 
<TouchableOpacity onPress={() => navigation.navigate("RedUser ")}> 
  <Image source={Perfil} style={{ width: 40, height: 35 }} /> 
  <Text>Perfil</Text> 
</TouchableOpacity> 
*/}

      </View>
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
  boton: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#5D4037",
    bottom: 50,
  },
  texto: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#5D4037",
    bottom: 90,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 101,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
