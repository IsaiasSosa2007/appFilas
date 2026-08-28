import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Image} from 'react-native';

const JefePan = ({ navigation, route }) => {
  const {comida,ingredientesSeleccionados =[], total=0 } = route.params;
  const [jefeSeleccionado, setJefeSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [cantidad, setCantidad] = useState('1'); // 🆕 Estado para cantidad

  const jefes = [
    { id: 1, nombre: 'Marcos', color: '#FF6B6B' },
    { id: 2, nombre: 'Leticia', color: '#4ECDC4' },
    { id: 3, nombre: 'Irna', color: '#FFD166' }
  ];

  const calcularTotalIngredientes = () => {
    if (!ingredientesSeleccionados || !Array.isArray(ingredientesSeleccionados)) {
      return 0;
    }
    return ingredientesSeleccionados.reduce((total, ing) => total + (ing.cantidad || 0), 0);
  };
const confirmarProduccion = () => {
    if (!jefeSeleccionado) {
      alert('Por favor selecciona un responsable de producción');
      return;
    }
    
    // Aquí podrías guardar esta información en una base de datos
    alert(`Producción de ${comida} confirmada bajo la supervisión de ${jefeSeleccionado.nombre}`);
    navigation.navigate('RedUser');
  };

  // 🆕 FUNCIÓN PARA REGISTRAR EN BASE DE DATOS (ACTUALIZADA)
  /*const registrarEnBaseDeDatos = async () => {
    setCargando(true);
    
    try {
      console.log('📤 Enviando datos al servidor...', {
        receta: receta,
        supervisor: jefeSeleccionado.nombre,
        ingredientes: ingredientesSeleccionados,
        cantidad: parseInt(cantidad) || 1 // 🆕 Incluir cantidad
      });

      const response = await fetch('http://192.168.100.228:3000/api/produccion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receta: receta,
          supervisor: jefeSeleccionado.nombre,
          ingredientes: ingredientesSeleccionados,
          cantidad: parseInt(cantidad) || 1 // 🆕 Enviar cantidad
        }),
      });

      const result = await response.json();
      console.log('📥 Respuesta del servidor:', result);
      
      if (result.success) {
        Alert.alert(
          '✅ Producción Registrada',
          `${receta} (${cantidad} unidades) fue registrada exitosamente bajo la supervisión de ${jefeSeleccionado.nombre}`,
          [{ text: 'OK', onPress: () => navigation.navigate('Principal') }]
        );
      } else {
        Alert.alert('❌ Error', result.error || 'No se pudo registrar en la base de datos');
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      Alert.alert(
        '❌ Error de Conexión', 
        'No se pudo conectar con el servidor. Verifica que esté corriendo en http://192.168.100.228:3000'
      );
    } finally {
      setCargando(false);
    }
  };

  const confirmarProduccion = () => {
    if (!jefeSeleccionado) {
      alert('Por favor selecciona un responsable de producción');
      return;
    }

    // 🆕 VALIDAR CANTIDAD
    const cantidadNum = parseInt(cantidad);
    if (!cantidad || cantidadNum <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }
    
    Alert.alert(
      'Confirmar Producción',
      `¿Estás seguro de registrar la producción de ${receta} (${cantidad} unidades) bajo la supervisión de ${jefeSeleccionado.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, Registrar', onPress: registrarEnBaseDeDatos }
      ]
    );
  };

  // 🆕 SI NO HAY DATOS, MOSTRAR ERROR
  if (!route.params) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
        </View>
        <View style={styles.contenidoCentrado}>
          <Text style={styles.errorText}>❌ Error: No se recibieron datos de la producción</Text>
          <TouchableOpacity 
            style={styles.botonFooter}
            onPress={() => navigation.navigate('Principal')}
          >
            <Text style={styles.textoBotonFooter}>Volver al Inicio</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
        
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contenidoScroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tituloPrincipal}>Control de Producción</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Receta: {comida}</Text>
          <Text style={styles.infoText}>Ingredientes utilizados: {ingredientesSeleccionados?.length || 0}</Text>
          <Text style={styles.infoText}>Total unidades de ingredientes: {calcularTotalIngredientes()}</Text>
          <Text style={styles.infoText}>Fecha: {new Date().toLocaleDateString()}</Text>
        </View>

        {/* 🆕 SECCIÓN CANTIDAD 
        /*<View style={styles.seccion}>
          <Text style={styles.subtitulo}>Cantidad a producir:</Text>
          <View style={styles.cantidadContainer}>
            <TextInput
              style={styles.inputCantidad}
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="1"
              maxLength={3}
            />
            <Text style={styles.textoCantidad}>unidades</Text>
          </View>
        </View>*/}

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
              disabled={cargando}
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
              Producción de {comida} ({cantidad} unidades) será registrada bajo la supervisión de:
            </Text>
            <Text style={styles.nombreJefe}>{jefeSeleccionado.nombre}</Text>
            <Text style={styles.detalleBD}>📊 Se guardará en la base de datos FILAS</Text>
          </View>
        )}

        {/* DETALLES DE INGREDIENTES */}
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Ingredientes a registrar:</Text>
          {ingredientesSeleccionados && ingredientesSeleccionados.length > 0 ? (
            ingredientesSeleccionados.map((ing, index) => (
              <View key={index} style={styles.ingredienteDetalle}>
                <Text style={styles.ingredienteNombre}>{ing.nombre}</Text>
                <Text style={styles.ingredienteCantidad}>
                  {ing.cantidad} {ing.unidad}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.sinIngredientes}>No hay ingredientes seleccionados</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.botonFooter, cargando && styles.botonDeshabilitado]}
          onPress={() => navigation.goBack()}
          disabled={cargando}
        >
          <Text style={styles.textoBotonFooter}>Volver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.botonFooter, 
            styles.botonConfirmar, 
            (!jefeSeleccionado || cargando || !cantidad) && styles.botonDeshabilitado
          ]}
          onPress={confirmarProduccion}
          disabled={!jefeSeleccionado || cargando || !cantidad}
        >
          <Text style={styles.textoBotonFooter}>
            {cargando ? 'Registrando...' : 'Confirmar Producción'}
          </Text>
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
  scrollView: {
    flex: 1,
  },
  contenidoScroll: {
    padding: 20,
  },
  contenidoCentrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
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
  // 🆕 ESTILOS PARA CANTIDAD
  cantidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  inputCantidad: {
    borderWidth: 2,
    borderColor: '#5D4037',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 80,
    marginRight: 10,
    color: '#5D4037',
  },
  textoCantidad: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '600',
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
  detalleBD: {
    color: '#E3F2FD',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  },
  ingredienteDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredienteNombre: {
    fontSize: 14,
    color: '#333',
    flex: 2,
  },
  ingredienteCantidad: {
    fontSize: 14,
    color: '#5D4037',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  sinIngredientes: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    justifyContent: 'space-between',
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

export default JefePan;