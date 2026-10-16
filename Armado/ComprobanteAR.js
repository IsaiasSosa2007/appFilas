import React from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // CAMBIO: se sacó TouchableOpacity (ya no se usa acá)
// CAMBIO: se eliminó el import de useSafeAreaInsets (ahora lo usa FooterBotones)
import Header from "../Componentes/Header";
import { FONDO } from "../Componentes/Fondo";
import Botones from "../Componentes/Botones"; // CAMBIO: import del nuevo componente

const ComprobanteAR = ({ navigation, route }) => {
  // CAMBIO: se eliminó const insets = useSafeAreaInsets();
  console.log('Comprobante route.params:', route.params); // <-- debug
  const { productos, productosSeleccionados =[], falla, totalBengalas = 0 } = route.params  || {};
 
  const calcularTotalProductos = () => {
    if(!productosSeleccionados) return(0);
    return productosSeleccionados.slice(0, 4).reduce((total, pro) => total + pro.cantidad, 0);
  };

  function getNombreColor(index) {
  const nombres = ['Azul', 'Rojo', 'Rosa', 'Violeta'];
  return nombres[index] || '';
}

  // CAMBIO: la navegación que antes estaba en el botón "Confirmar Uso" ahora es una función
  const confirmar = () => {
    // Los datos se guardan en Registro.js recién en Supervisor.js, junto con el jefe seleccionado
    navigation.navigate('Supervisor', {
      productos,
      productosSeleccionados,
      falla,
      totalBengalas: totalBengalas ?? route.params?.totalBengalas ?? 0,
      totalInsumos: calcularTotalProductos(),
    });
  };
 
 
  return (
    <View style={styles.container}>
      {/* CAMBIO: paddingBottom bajó de 200 a 20 porque el footer ya no flota encima (no es absolute).
          También saqué marginVertical: true, que no era un valor válido. */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <Header />
      
        <Text style={styles.tituloPrincipal}>Control de: {productos}</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Hora: {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>Producción: {productos}</Text>
          <Text style={styles.infoText}>Total insumos utilizados: {calcularTotalProductos()} unidades</Text>
          <Text style={styles.infoText}>Cantidad de producto final: {totalBengalas} </Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.sub}>Insumos Utilizados:</Text>
            {productosSeleccionados.length>0 && productosSeleccionados.map ((productos, index) => (
              <View key={index} style={styles.itemComprobante}>
                <Text style={styles.itemNombre}>
                  {productos.nombre}
                  {productos.nombre === 'Color' 
                    ? `: ${getNombreColor(productos.colorIndex)}`
                    : ''}
                </Text> 
                <Text style={styles.itemCantidad}>{productos.cantidad}</Text>
              </View>
            ))}
                </View>
                <Text style = {styles.subtitulo}>Falla seleccionada: </Text>
                {falla && (
                  <View style={styles.itemComprobante}>
                  <Text style = {styles.itemNombre}>{falla.nombre}</Text>
                  </View>
                )}
               

        {/* <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Resumen de {productos}</Text>
          <Text style={styles.totalSubtext}>{calcularTotalProductos()} Insumos utilizados</Text>antes tenia productosSeleccionados.length 
          ponemos productosSeleccionados.length-1 para quitar el elemento de productos finales(esta dentro del array de productos)
          {falla && <Text style={styles.totalSubtext}>Falla: {falla.nombre}</Text>}
        </View> */}

        <View style={styles.seccion}>
          {/* <Text style={styles.subtitulo}>Información:</Text> */}
          <Text style={styles.infoText}>• Este registro ayuda a controlar el stock</Text>
        </View>
      </ScrollView>

      {/* CAMBIO: footer reutilizable, con textos propios de esta pantalla */}
      <Botones
        textoContinuar="CONFIRMAR USO →"
        onVolver={() => navigation.goBack()}
        onContinuar={confirmar}
      />

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FONDO, // CAMBIO: antes era 'FONDO' (con comillas, era un texto)
  },
  sub: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    letterSpacing: 2,
    marginLeft: 6,
    fontFamily: 'arial',
  },

  subtituloHeader: {
    fontSize: 12,
    color: '#ECEFF1',
    marginTop: 4,
  },
  contenido: {
    flex: 1,
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 16,
    fontFamily: 'arial',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    margin: 10,
  },
  infoText: {
    fontSize: 15,
    color:'#5D4037',
    marginBottom: 4,
    marginLeft: 8,
    fontFamily: 'arial',
    fontWeight: '900',
  },
  seccion: {
    marginBottom: 20,
    padding: 6,
  },
  subtitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 15,
    marginLeft: 11,
    fontFamily: 'arial',
  },
  itemComprobante: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    margin: 4,
    fontFamily: 'arial',
  },
  itemNombre: {
    flex: 2,
    fontSize: 14,
    color: '#333',
    fontWeight: '900',
  },
  itemCantidad: {
    flex: 1,
    fontSize: 14,
    color: '#5D4037',
    textAlign: 'right',
    fontWeight: '600',
  },
  totalContainer: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    margin: 9,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  totalSubtext: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'arial',
  },
  // CAMBIO: se eliminaron los estilos footer, botonFooter, botonConfirmar y textoBotonFooter
  // (ahora viven dentro de FooterBotones.js)
});

export default ComprobanteAR;