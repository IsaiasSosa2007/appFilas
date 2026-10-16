import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { guardarRegistro } from '../Registro'; //llamada a la funcion guardarRegistro
// CAMBIO: se eliminó el import de useSafeAreaInsets (ahora lo usa FooterBotones)
import Header from "../Componentes/Header";
import { FONDO } from "../Componentes/Fondo";
import Botones from "../Componentes/Botones"; // CAMBIO: import del nuevo componente

const Supervisor = ({navigation, route}) =>{
  // CAMBIO: se eliminó const insets = useSafeAreaInsets();
  const { productos, productosSeleccionados, falla, totalBengalas, totalInsumos} = route.params;//hay que importar de alguna el valor de cantidad de productos finales
  const [jefeSeleccionado, setJefeSeleccionado] = useState(null);

  const jefes = [
    { id: 1, nombre: 'Ana', color: '#B8A1D9' },
    { id: 2, nombre: 'Fernanda', color: '#FFD166' },
    { id: 3, nombre: 'Leticia', color: '#FF6B6B' },
    { id: 4, nombre: 'Sabrina', color: '#8FD3E8' },
    { id: 5, nombre: 'Veronica', color: '#4ECDC4' },
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

  // CAMBIO: lo que antes estaba dentro del onPress del botón "Confirmar" ahora es una función
  // Acá se guarda el único registro del control, con todos los datos juntos
  const guardarYConfirmar = async () => {
    if (!jefeSeleccionado) return;

    await guardarRegistro({
      tipoProduccion: productos,
      totalInsumosUsados: calcularTotalProductos(),
      totalInsumosHechos: totalBengalas,
      fallaFinal: falla?.nombre,
      supervisorFinal: jefeSeleccionado.nombre,
    });

    confirmarProduccion();
  };

  return (
    <View style={styles.container}>

      <Header />

      {/* CAMBIO: paddingBottom bajó a 20 porque el footer ya no flota encima (no es absolute) */}
      <ScrollView
        style={styles.contenido} contentContainerStyle={{ paddingBottom: 20 }}>

        <Text style={styles.tituloPrincipal}>CONTROL DE PRODUCCIÓN</Text>
        
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

      {/* CAMBIO: footer reutilizable, con el texto "Confirmar" y deshabilitado hasta elegir responsable */}
      <Botones
        textoContinuar="FINALIZAR →"
        onVolver={() => navigation.goBack()}
        onContinuar={guardarYConfirmar}
        deshabilitado={!jefeSeleccionado}
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
  // CAMBIO: se eliminaron los estilos footer, botonFooter, botonConfirmar,
  // botonDeshabilitado y textoBotonFooter (ahora viven dentro de FooterBotones.js)
});
export default Supervisor;