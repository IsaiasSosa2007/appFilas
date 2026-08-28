import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ComprobanteEN = ({ navigation, route }) => {
  console.log('Comprobante route.params:', route.params);
  const { recetas, ingredienteSeleccionados = [], frascoSeleccionado, totalIngredientes = 0 } = route.params || {};
   const calcularTotalIngredientes = () => {
    if (!ingredienteSeleccionados) return 0;
    return ingredienteSeleccionados.reduce((total, ing) => total + ing.cantidad, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
        <Image source={require('../assets/Logo.png')} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>      
      <ScrollView style={styles.contenido}>
        <Text style={styles.tituloPrincipal}>Control de Ingredientes - {recetas}</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Hora: {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>Receta: {recetas}</Text>
          <Text style={styles.infoText}>Total ingredientes: {calcularTotalIngredientes()} unidades</Text>
          <Text style={styles.infoText}>Frascos utilizados: {frascoSeleccionado?.tipo}</Text>
          <Text style={styles.infoText}>Cantidad de frascos: {ingredienteSeleccionados.find(i => i.nombre === 'Frascos')?.cantidad || 0}</Text>
         <Text style={styles.infoText}>Total de insumos hechos: {totalIngredientes || 0}</Text>
        </View>
        <Text style={styles.subtitulo}>Ingredientes Utilizados:</Text>

          {ingredienteSeleccionados.length>0 && ingredienteSeleccionados.map((ingrediente, index) => (
            <View key={index} style={styles.itemComprobante}>
              <Text style={styles.itemNombre}>{ingrediente.nombre}</Text>
              <Text style={styles.itemCantidad}>
                {ingrediente.cantidad} {ingrediente.unidad}
              </Text>
            </View>
          ))}
       

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Resumen de {recetas}</Text>
          <Text style={styles.totalSubtext}>{ingredienteSeleccionados.length} ingredientes utilizados</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Información:</Text>
          <Text style={styles.infoText}>• Este registro ayuda a controlar el stock</Text>
        </View>
        
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity 
          style={[styles.botonFooter, styles.botonConfirmar]}
          onPress={() => navigation.navigate('Jefe', {
            recetas: recetas,
            ingredienteSeleccionados: ingredienteSeleccionados,
            totalIngredientes: totalIngredientes || calcularTotalIngredientes(),
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
    padding: 16, 
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
  contenido: {
    flex: 1,
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  seccion: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 15,
  },
  itemComprobante: {
       flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: 'white',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 8,
    marginHorizontal: 11,
  },
  itemNombre: {
    flex: 2,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
  },
  footer: {
    flexDirection: 'row',  
    backgroundColor: 'white',
    borderTopWidth: 1, 
    borderTopColor: '#EEE', 
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 30,
    borderTopWidth: 1,

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
    backgroundColor: '#4CAF50' 
  },

  textoBotonFooter: {
     color: 'white', 
     fontSize: 14, 
     fontWeight: 'bold' },
});

export default ComprobanteEN;