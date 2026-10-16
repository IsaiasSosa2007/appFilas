import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FooterBotones({
  onVolver,
  onContinuar,
  textoVolver = "← VOLVER",
  textoContinuar = "CONTINUAR →",
  deshabilitado = false,
  mostrarVolver = true,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        { paddingBottom: insets.bottom, height: 65 + insets.bottom },
      ]}
    >
      {mostrarVolver && (
        <TouchableOpacity style={styles.botonFooter} onPress={onVolver}>
          <Text style={styles.textoBotonFooter}>{textoVolver}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[
          styles.botonFooter,
          styles.botonConfirmar,
          deshabilitado && styles.botonDeshabilitado,
        ]}
        onPress={onContinuar}
        disabled={deshabilitado}
      >
        <Text style={styles.textoBotonFooter}>{textoContinuar}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    justifyContent: "space-between",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
  },
  botonFooter: {
    backgroundColor: "#5D4037",
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  botonConfirmar: {
    backgroundColor: "#4CAF50",
  },
  botonDeshabilitado: {
    backgroundColor: "#CCCCCC",
  },
  textoBotonFooter: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});