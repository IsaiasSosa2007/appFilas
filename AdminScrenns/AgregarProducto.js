import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useState } from 'react';
import Perfil from '../assets/perfil.png'
import Home from '../assets/Home.png'

const AgregarProducto =({navigation, productos, agregarProducto, quitarProducto}) => {
  
    return( 
        <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/Logo.png")} style={styles.logo}/>
          <Text style={styles.tituloHeader}>F. I. L. A. S.</Text> 
        </View>
        <ScrollView style={styles.contenido}>
          <Text style={styles.titulo}>Gestionar Productos</Text>
             
          <View style ={styles.selection}>
            {productos.map((producto) => (
              <View key={producto.id} style={styles.itemProducto}>        
                     <Image source={producto.imagen} style={styles.imagenProducto}/>
                     <Text style={styles.nombreProducto}>{producto.nombre}</Text>

                     <View style={styles.contenedorBotones}>
                      <TouchableOpacity
                        style={[styles.boton, styles.botonMenos ]}
                        onPress ={()=> quitarProducto(producto.id)}
                         disabled={!producto.agregado}
                        >
                      <Text style={styles.textoBoton}>-</Text>   
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.boton, styles.botonMas, !producto.agregado && styles.botonHabilitado]}
                        onPress={()=> agregarProducto(producto.id)}
                        disabled={producto.agregado} 
                        >
                          <Text style={styles.textoBoton}>+</Text>
                  </TouchableOpacity>
                </View>
                </View>
            
              ))} 
            </View> 
  </ScrollView>
          <View style={styles.footer}>
         <TouchableOpacity 
           style={styles.botonFooter} 
           onPress={() => navigation.goBack()}
         >
           <Text style={styles.textoBotonFooter}>Volver</Text>
         </TouchableOpacity>
       </View>
     </View>
     
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#D98F0E',
 
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 30,
  },
  itemProducto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  imagenProducto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  nombreProducto: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#5D4037',
  },
  contenedorBotones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  botonMas: {
    backgroundColor: '#CCCCCC',
  },
  botonMenos: {
    backgroundColor: '#FF6B6B',
  },
  botonHabilitado: {
    backgroundColor: '#4CAF50',
  },
  textoBoton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  botonFooter: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotonFooter: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default AgregarProducto;