import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ComprobanteAR = ({ navigation, route }) => {
  console.log('Comprobante route.params:', route.params); // <-- debug
  const { productos, productosSeleccionados =[], falla, totalBengalas = 0 } = route.params  || {};
 
  const calcularTotalProductos = () => {
    if(!productosSeleccionados) return(0);
    return productosSeleccionados.reduce((total, pro) => total + pro.cantidad, 0);
  };

  function getNombreColor(index) {
  const nombres = ['Azul', 'Rojo', 'Rosa', 'Violeta'];
  return nombres[index] || '';
}
 
 
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 200, marginVertical: true, }}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text> 
      </View>
      
        <Text style={styles.tituloPrincipal}>Control de: {productos}</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Hora: {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>Producción: {productos}</Text>
          <Text style={styles.infoText}>Total insumos usados: {calcularTotalProductos()} unidades</Text>
          <Text style={styles.infoText}>Total de insumos hechos: {totalBengalas} </Text>
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
               

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Resumen de {productos}</Text>
          <Text style={styles.totalSubtext}>{productosSeleccionados.length} Insumos utilizados</Text>
          {falla && <Text style={styles.totalSubtext}>Falla: {falla.nombre}</Text>}
        </View>

        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Información:</Text>
          <Text style={styles.infoText}>• Este registro ayuda a controlar el stock</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botonFooter} 
          onPress={() => navigation.goBack()}
        >
        <Text style={styles.textoBotonFooter}>Volver</Text>
        </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.botonFooter, styles.botonConfirmar]}
          onPress={() => navigation.navigate('Supervisor', {
          productos,
          productosSeleccionados,
          falla,
          totalBengalas: totalBengalas ?? route.params?.totalBengalas ?? 0
     
        })}
        >
        <Text style={styles.textoBotonFooter}>Confirmar Uso</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D98F0E',
  },
  header: {
    backgroundColor: '#5D4037',
    padding: 12, 
    paddingTop: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    gap: 6,
  },
  logo :{
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: -6, 
    marginTop: 50,
  },
   tituloHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 2,
    fontFamily: 'arial',
    marginTop: 50,
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
  footer :{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 101, 
    backgroundColor: 'white',
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
  },
    botonFooter: {
    backgroundColor: '#5D4037',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  
  },
  botonConfirmar: {
    backgroundColor: '#4CAF50',
  },
  textoBotonFooter: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ComprobanteAR;