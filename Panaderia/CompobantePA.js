import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';

const ComprobantePA = ({ navigation, route }) => {
   console.log('Comprobante route.params:', route.params); // <-- debug
  const {comida,  ingredientesSeleccionados =[], total = 0} = route.params||{};

  const calcularTotal = () => {
    if (! ingredientesSeleccionados) return 0;
    return  ingredientesSeleccionados.reduce((total, ingredientes) => total + ingredientes.cantidad, 0);
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>  
        <Image source={require('../assets/Logo.png')} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>
        <ScrollView style={styles.contenido} >
        <Text style={styles.tituloPrincipal}>Comprobante - {comida}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
          <Text style={styles.infoText}>Hora: {new Date().toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>Comida: {comida}</Text>
          <Text style={styles.infoText}>Total ingredientes: {calcularTotal()} unidades</Text>
          <Text style={styles.infoText}>Total de insumos hechos: {total || 0}</Text>
        </View>
        <Text style={styles.subtitulo}>Ingredientes a utilizar:</Text>
        
        { ingredientesSeleccionados.length>0 &&  ingredientesSeleccionados.map((ing, index) => (
          <View key={index} style={styles.ingredienteItem}>
            <Text style={styles.ingredienteNombre}>{ing.nombre}</Text>
            <Text style={styles.ingredienteCantidad}>
              {ing.cantidad} {ing.unidad}
            </Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Resumen de {comida}</Text>
                  <Text style={styles.totalSubtext}>{ingredientesSeleccionados.length} ingredientes utilizados</Text>
        </View>
        
                <View style={styles.seccion}>
                  <Text style={styles.subtitulo}>Información:</Text>
                  <Text style={styles.infoText}>• Este registro ayuda a controlar el stock</Text>
                </View>
        
        <Text style={styles.infoText}>
          ✅ Listo para registrar la producción
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botonFooter} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonFooter}>Volver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botonFooter, styles.botonConfirmar]}
          onPress={() => navigation.navigate('JefePan', {
          comida: comida,
          ingredientesSeleccionados: ingredientesSeleccionados,
          totalComidas: calcularTotal()
          })}
        >
          <Text style={styles.textoBotonFooter}>Confirmar y Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Mismos estilos que PizzaReceta
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#D98F0E' 
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
    padding: 20 
  },

  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 20,
  
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
    color: '#333',
    marginBottom: 4,
    marginLeft: 8,
    fontWeight: '900',
  },
  seccion: {
    marginBottom: 20,
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

  ingredienteItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    backgroundColor: 'white',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 8,
    marginHorizontal: 11,
  },

  ingredienteNombre: { 
    fontSize: 16, 
    color: '#333', 
    fontWeight: '500' 
  },

  ingredienteCantidad: { 
    fontSize: 16, 
    color: '#5D4037', 
    fontWeight: '600' 
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
     color: 'white', fontSize: 14, fontWeight: 'bold' },
});

export default ComprobantePA;