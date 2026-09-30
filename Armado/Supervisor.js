import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { guardarRegistro } from '../Registro'; //llamada a la funcion guardarRegistro
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Supervisor = ({navigation, route}) =>{
  const insets = useSafeAreaInsets();
  const { productos, productosSeleccionados, falla, totalBengalas, totalInsumos} = route.params;//hay que importar de alguna el valor de cantidad de productos finales
  const [jefeSeleccionado, setJefeSeleccionado] = useState(null);

  const jefes = [
    { id: 1, nombre: 'Marcos', color: '#FF6B6B' },
    { id: 2, nombre: 'Leticia', color: '#4ECDC4' },
    { id: 3, nombre: 'Irma', color: '#FFD166' },
  ];

  const calcularTotalProductos = () => {
    return productosSeleccionados.reduce((total, pro) => total + pro.cantidad, 0);
  };

  const confirmarProduccion = () => {
    if (!jefeSeleccionado) {
      alert('Por favor selecciona un responsable de producción');
      return;
    }
    
    // Aquí podrías guardar esta información en una base de datos
   alert(`Producción de ${productos} confirmada bajo la supervisión de ${jefeSeleccionado.nombre}`);
    navigation.navigate('RedUser');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
              <Image source={require("../assets/Logo.png")} style={styles.logo}/>
              <Text style={styles.tituloHeader}>F. I. L. A. S.</Text> 
            </View>
      <ScrollView style={styles.contenido}>
        <Text style={styles.tituloPrincipal}>Control de Producción</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Producto: {productos}</Text>
          <Text style={styles.infoText}>Total insumos utilizados: {totalInsumos}</Text>
          <Text style={styles.infoText}>Cantidad de producto final: {totalBengalas}</Text>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Seleccionar responsable de producción:</Text>
          
          {jefes.map((jefe) => (
            <TouchableOpacity
              key={jefe.id}
              style={[
                styles.botonJefe,
                { backgroundColor: jefe.color },
                jefeSeleccionado?.id === jefe.id && styles.jefeSeleccionado
              ]}
              onPress={() => setJefeSeleccionado(jefe)}
            >
              <Text style={styles.textoBotonJefe}>{jefe.nombre}</Text>
              {jefeSeleccionado?.id === jefe.id && (
                <Text style={styles.checkmark}>✓ Seleccionado</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {jefeSeleccionado && (
          <View style={styles.confirmacionBox}>
            <Text style={styles.textoConfirmacion}>
              Producción de {productos} será registrada bajo la supervisión de:
            </Text>
            <Text style={styles.nombreJefe}>{jefeSeleccionado.nombre}</Text>
          </View>
        )}
      </ScrollView>

        <View style={[styles.footer,{
          paddingBottom: insets.bottom,
          height: 65 + insets.bottom,
          },
        ]}>
        <TouchableOpacity 
          style={styles.botonFooter}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotonFooter}>Volver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.botonFooter, styles.botonConfirmar, !jefeSeleccionado && styles.botonDeshabilitado]}
          
          // Acá se guarda el único registro del control, con todos los datos juntos
          onPress={async () => {
            if (!jefeSeleccionado) return;

            await guardarRegistro({
              tipoProduccion: productos,
              totalInsumosUsados: calcularTotalProductos(),
              totalInsumosHechos: totalBengalas,
              fallaFinal: falla?.nombre,
              supervisorFinal: jefeSeleccionado.nombre,
            });

            confirmarProduccion();
          }}
          disabled={!jefeSeleccionado}
        >
          <Text style={styles.textoBotonFooter}>Confirmar</Text>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: '100%',
    height: 140,
    bottom: '20%',
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
    marginTop: 140,
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
    marginBottom: 5,
    fontWeight: '500',
  },
  seccion: {
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 15,
    textAlign: 'center',
  },
  botonJefe: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  jefeSeleccionado: {
    borderWidth: 3,
    borderColor: '#5D4037',
    transform: [{ scale: 1.02 }],
  },
  textoBotonJefe: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  confirmacionBox: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoConfirmacion: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  nombreJefe: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
  botonDeshabilitado: {
    backgroundColor: '#CCCCCC',
  },
  textoBotonFooter: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Supervisor;
