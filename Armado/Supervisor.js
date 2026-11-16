import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { guardarRegistro, obtenerSupervisores } from '../Registro_bdd'; // CAMBIO: se importa también obtenerSupervisores
import Header from "../Componentes/Header";
import { FONDO } from "../Componentes/Fondo";
import Botones from "../Componentes/Botones";
import { useUsuario } from "../UsuarioContext"; // CAMBIO: para saber qué operario hizo el conteo

// CAMBIO: los colores ahora se asignan por posición, ya que los supervisores vienen de la base
const COLORES = ['#B8A1D9', '#FFD166', '#FF6B6B', '#8FD3E8', '#4ECDC4'];

const Supervisor = ({navigation, route}) =>{
  const { usuario } = useUsuario(); // CAMBIO: operario que inició sesión en el Login
  const { productos, productosSeleccionados, falla, totalProduccion, totalInsumos} = route.params;
  const [jefeSeleccionado, setJefeSeleccionado] = useState(null);
  // CAMBIO: lista de supervisores cargada desde Supabase (tabla perfiles, rol = 'supervisor')
  const [jefes, setJefes] = useState([]);
  const [cargandoJefes, setCargandoJefes] = useState(true);
  const [guardando, setGuardando] = useState(false);

  // CAMBIO: carga los supervisores al abrir la pantalla
  useEffect(() => {
    let activo = true;
    (async () => {
      const lista = await obtenerSupervisores();
      if (!activo) return;
      setJefes(
        lista.map((s, i) => ({
          id: s.id, // uuid real de perfiles
          nombre: (s.nombre ?? 'SIN NOMBRE').toUpperCase(),
          color: COLORES[i % COLORES.length],
        }))
      );
      setCargandoJefes(false);
    })();
    return () => {
      activo = false;
    };
  }, []);

  const calcularTotalProductos = () => {
    return productosSeleccionados.reduce((total, pro) => total + pro.cantidad, 0);
  };

  const confirmarProduccion = () => {
    if (!jefeSeleccionado) {
      alert('Por favor selecciona un responsable de producción');
      return;
    }

    alert(`PRODUCCIÓN DE ${productos} CONFIRMADA BAJO LA SUPERVISIÓN DE ${jefeSeleccionado.nombre}`);
    navigation.navigate('RedUser');
  };

  // Guarda el único registro del control, con todos los datos juntos
  const guardarYConfirmar = async () => {
    if (!jefeSeleccionado || guardando) return;

    if (!usuario?.id) {
      alert('No se pudo identificar al operario. Volvé a ingresar con tu nombre.');
      return;
    }

    try {
      setGuardando(true);
      await guardarRegistro({
        tipoProduccion: productos,
        totalInsumosUsados: calcularTotalProductos(),
        totalInsumosHechos: totalProduccion,
        fallaFinal: falla?.nombre,
        operarioId: usuario.id, // CAMBIO: id del operario que hizo el conteo
        supervisorId: jefeSeleccionado.id, // CAMBIO: id del supervisor elegido por el operario
      });

      confirmarProduccion();
    } catch (error) {
      // CAMBIO: si falla el guardado no se confirma ni se navega
      alert('No se pudo guardar el registro. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>

      <Header />

      <ScrollView
        style={styles.contenido} contentContainerStyle={{ paddingBottom: 20 }}>

        <Text style={styles.tituloPrincipal}>CONTROL DE PRODUCCIÓN</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>PRODUCTO: {productos}</Text>
          <Text style={styles.infoText}>TOTAL INSUMOS UTILIZADOS: {totalInsumos}</Text>
          <Text style={styles.infoText}>CANTIDAD DE PRODUCTO FINAL: {totalProduccion}</Text>
          <Text style={styles.infoText}>FECHA: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>SELECCIONAR RESPONSABLE DE PRODUCCIÓN:</Text>

          {/* CAMBIO: estados de carga y lista vacía */}
          {cargandoJefes && <ActivityIndicator size="large" color="#5D4037" />}

          {!cargandoJefes && jefes.length === 0 && (
            <Text style={styles.textoVacio}>No hay supervisores disponibles.</Text>
          )}

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
                <Text style={styles.checkmark}>✓ SELECCIONADO</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {jefeSeleccionado && (
          <View style={styles.confirmacionBox}>
            <Text style={styles.textoConfirmacion}>
              PRODUCCIÓN DE {productos} SERÁ REGISTRADA BAJO LA SUPERVISIÓN DE:
            </Text>
            <Text style={styles.nombreJefe}>{jefeSeleccionado.nombre}</Text>
          </View>
        )}
      </ScrollView>

      <Botones
        textoContinuar="FINALIZAR →"
        onVolver={() => navigation.goBack()}
        onContinuar={guardarYConfirmar}
        deshabilitado={!jefeSeleccionado || guardando}
      />

      <StatusBar style="light" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FONDO,
  },
  contenido: {
    flex: 1,
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
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
    color: '#1F4E79',
    marginBottom: 5,
    fontWeight: '500',
  },
  seccion: {
    marginBottom: 25,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  textoVacio: {
    fontSize: 14,
    color: '#000000',
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
    borderColor: '#ffffff',
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
    backgroundColor: '#a5b3c9',
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
});
export default Supervisor;