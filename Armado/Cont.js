import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Dimensions, Linking, TouchableWithoutFeedback, Modal } from 'react-native';
import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo, faPenToSquare, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { VideoView, useVideoPlayer } from 'expo-video';
import Header from "../Componentes/Header";
import { FONDO } from "../Componentes/Fondo";
import Botones from "../Componentes/Botones";

const { width: screenWidth } = Dimensions.get('window');

export default function Cont({ navigation }) {

  const [imagenAmpliada, setImagenAmpliada] = useState(false);

  function Confirmar() {
    Alert.alert(
      "¿Estás seguro?",
      "¿Querés continuar con la acción?",
      [
        { text: "No", onPress: () => Alert.alert("Cancelado!!"), style: "cancel" },
        { text: "Sí", onPress: () => navigation.navigate('Final') },
      ],
      { cancelable: false }
    );
  }

  // Los insumos son Bolsas y Cartón; el último elemento es el producto final
  const [productos, setProductos] = useState([
    { id: 1, imagen: require("../assets/Bolsitas.jpg"), nombre: 'Bolsas', cantidad: 0, seleccionado: false },
    { id: 2, imagen: require("../assets/Carton.jpg"), nombre: 'Carton', cantidad: 0, seleccionado: false },
    { id: 3, imagen: require("../assets/Prd2.png"), nombre: 'Producto final', cantidad: 0, seleccionado: false },
  ]);

  const aumentarCantidad = (id) => {
    setProductos(prev => prev.map(pro =>
      pro.id === id ? { ...pro, cantidad: pro.cantidad + 1 } : pro
    ));
  };

  const disminuirCantidad = (id) => {
    setProductos(prev => prev.map(pro =>
      pro.id === id && pro.cantidad >= 1 ? { ...pro, cantidad: pro.cantidad - 1 } : pro
    ));
  };

  const toggleSeleccion = (id) => {
    setProductos(prev => prev.map(pro =>
      pro.id === id ? { ...pro, seleccionado: !pro.seleccionado } : pro
    ));
  };

  // Validación centralizada, se recalcula en cada render
  const insumos = productos.slice(0, -1);
  const productoFinal = productos[productos.length - 1];

  const faltaSeleccionar =
    insumos.some(p => !p.seleccionado) || !productoFinal.seleccionado;
  const faltaCantidad =
    insumos.some(p => p.cantidad === 0) || productoFinal.cantidad === 0;
  const puedeContinuar = !faltaSeleccionar && !faltaCantidad;

  let mensajeFalta = '';
  if (faltaSeleccionar) mensajeFalta = 'Seleccioná todas las casillas';
  else if (faltaCantidad) mensajeFalta = 'Elegí una cantidad mayor a 0 en todos los insumos';

  const continuar = () => {
    if (!puedeContinuar) {
      alert(mensajeFalta);
      return;
    }
    navigation.navigate('Fallas', {
      productos: 'Bengala',
      productosSeleccionados: insumos,
      totalBengalas: productoFinal.cantidad,
    });
  };

  const abrirEnYouTube = () => {
    Linking.openURL('https://youtu.be/cbJFicyHemA');
  };

  // Cantidad de insumos seleccionados (sin contar el producto final)
  const productosSeleccionadosCount = insumos.filter(p => p.seleccionado).length;

  const player = useVideoPlayer(
    require('../assets/tutorialBengalas.mp4'),
    (player) => {
      player.loop = false;
    }
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>

        {/* LOGO BENGALA GRANDE */}
        <View style={styles.logoContainer}>
          <View style={styles.Logo}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setImagenAmpliada(true)}
            >
              <Image
                source={require('../assets/bengala.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.pizzaText}>ARMADO DE BENGALAS</Text>
          </View>
        </View>

        <Modal
          visible={imagenAmpliada}
          transparent
          animationType="fade"
          onRequestClose={() => setImagenAmpliada(false)} // botón "atrás" en Android
        >
          <TouchableWithoutFeedback onPress={() => setImagenAmpliada(false)}>
            <View style={styles.modalFondo}>
              <Image
                source={require('../assets/Prd2.png')}
                style={styles.imagenAmpliada}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Insumos */}
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>INSUMOS:</Text>
          <Text style={styles.texto}>• BOLSA DE CELOFÁN</Text>
          <Text style={styles.texto}>• CARTÓN</Text>
          <Text style={styles.texto}>• BENGALA</Text>
        </View>

        {/* VIDEO TUTORIAL */}
        <View style={styles.seccion}>
          <View style={styles.tituloConIcono}>
            <FontAwesomeIcon icon={faVideo} size={28} color="#000000" />
            <Text style={styles.tituloSinMargen}>VIDEO TUTORIAL</Text>
          </View>
          <View style={styles.videoContainer}>
            <View style={styles.videoWrapper}>
              <VideoView
                player={player}
                style={styles.videoPlayer}
                nativeControls={true}
                allowsFullscreen={true}
                allowsPictureInPicture={true}
                contentFit="contain"
              />
            </View>

            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>TUTORIAL: ARMADO DE BENGALAS PASO A PASO</Text>
              <Text style={styles.videoDescription}>
                APRENDE A REALIZAR EL ARMADO DE BENGALAS, LISTO PARA EL MERCADO
              </Text>
              <TouchableOpacity style={[styles.botonYouTube, styles.botonDeshabilitado]} onPress={abrirEnYouTube} disabled={true}>
                <View style={styles.filaIcono}>
                  <FontAwesomeIcon icon={faYoutube} size={22} color="#FFFFFF" />
                  <Text style={styles.botonYouTubeTexto}>ABRIR EN YOUTUBE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Paso a Paso */}
        <View style={styles.seccion}>
          <View style={styles.tituloConIcono}>
            <FontAwesomeIcon icon={faPenToSquare} size={28} color="#000000" />
            <Text style={styles.tituloSinMargen}>PASO A PASO</Text>
          </View>
          <View style={styles.pasosContainer}>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>1</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Agarrar bolsas</Text>
                    <Text style={styles.pasoDescripcion}>Abrir bolsas</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_1.png")} style={styles.imagen} />
              </View>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>2</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Poner cartones</Text>
                    <Text style={styles.pasoDescripcion}>Colocar carton dentro de la bolsa</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_2.png")} style={styles.imagen} />
              </View>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>3</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Poner la bengala</Text>
                    <Text style={styles.pasoDescripcion}>Colocar la bengala en la bolsa</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_4.png")} style={styles.imagen} />
              </View>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>4</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Abrochar la bolsa</Text>
                    <Text style={styles.pasoDescripcion}>Cerrar la bolsa con la bengala adentro</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_3.png")} style={styles.imagen} />
              </View>
            </View>
          </View>
        </View>

        {/* Contador */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>INSUMOS</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>SELECCIONA LOS INSUMOS QUE VAS A UTILIZAR EN ESTA PRODUCCIÓN</Text>
            <Text style={styles.contadorSeleccionados}>
              {productosSeleccionadosCount} DE {insumos.length} INSUMOS SELECCIONADOS
            </Text>
          </View>

          <Text style={styles.tituloSeccion}>SELECCIONAR CANTIDAD</Text>

          {/* Una "cajita" por cada insumo (Bolsas y Cartón) */}
          {insumos.map((producto) => (
            <View key={producto.id} style={[styles.productoContainer, producto.seleccionado && styles.productoSeleccionado]}>
              <View style={styles.leftGroup}>
                <TouchableOpacity
                  style={[styles.productoCheckbox, producto.seleccionado && styles.productoCheckboxSeleccionado]}
                  onPress={() => toggleSeleccion(producto.id)}>
                  {producto.seleccionado && <Text style={styles.checkmark}> ✓ </Text>}
                </TouchableOpacity>
                <Image source={producto.imagen} style={styles.img1} />
              </View>
              <View style={styles.rightGroup}>
                <View style={styles.counterBox}>
                  <View style={styles.contadorContainer}>
                    <TouchableOpacity style={styles.botonContador} onPress={() => disminuirCantidad(producto.id)}>
                      <Text style={styles.textoBotonContador}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.cantidad}>{producto.cantidad}</Text>
                    <TouchableOpacity style={styles.botonContador} onPress={() => aumentarCantidad(producto.id)}>
                      <Text style={styles.textoBotonContador}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}

          <View style={[styles.notaContainer, styles.notaFila]}>
            <FontAwesomeIcon icon={faLightbulb} size={22} color="#000000" />
            <Text style={styles.notaText}>
              SOLO LOS INSUMOS SELECCIONADOS SE REGISTRARÁN EN EL SISTEMA DE PRODUCCIÓN
            </Text>
          </View>

          <View>
            <Text style={styles.tituloSeccion}>Seleccionar cantidad de bengalas</Text>
          </View>

          {/* Producto final */}
          <View key={productoFinal.id} style={[styles.productoContainer, productoFinal.seleccionado && styles.productoSeleccionado]}>
            <View style={styles.leftGroup}>
              <TouchableOpacity
                style={[styles.productoCheckbox, productoFinal.seleccionado && styles.productoCheckboxSeleccionado]}
                onPress={() => toggleSeleccion(productoFinal.id)}>
                {productoFinal.seleccionado && <Text style={styles.checkmark}> ✓ </Text>}
              </TouchableOpacity>
              <Image source={productoFinal.imagen} style={styles.img1} />
            </View>
            <View style={styles.rightGroup}>
              <View style={styles.counterBox}>
                <View style={styles.contadorContainer}>
                  <TouchableOpacity style={styles.botonContador} onPress={() => disminuirCantidad(productoFinal.id)}>
                    <Text style={styles.textoBotonContador}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cantidad}>{productoFinal.cantidad}</Text>
                  <TouchableOpacity style={styles.botonContador} onPress={() => aumentarCantidad(productoFinal.id)}>
                    <Text style={styles.textoBotonContador}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Aviso de qué falta para poder continuar */}
      {!puedeContinuar && (
        <Text style={styles.avisoFalta}>{mensajeFalta}</Text>
      )}

      {/* FOOTER */}
      <Botones
        onVolver={() => navigation.goBack()}
        onContinuar={continuar}
        deshabilitado={!puedeContinuar}
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FONDO,
  },
  contenido: {
    flex: 1,
    padding: 20
  },
  // LOGO bengala
  image: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },

  // SECCIÓN PASOS
  pasosContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
  },
  pasoItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#5D4037',
    flex: 1,
    justifyContent: 'center'
  },
  pasoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between'
  },
  pasosContenedor2: {
    flexDirection: 'row',
    width: '60%'
  },
  pasoTituloInstruccion: {
    flexDirection: 'column',
  },
  pasoNumero: {
    width: 30,
    height: 30,
    backgroundColor: '#5D4037',
    color: 'white',
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 12,
  },
  pasoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    flex: 1,
  },
  pasoDescripcion: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  // Video
  seccion: {
    marginBottom: 25,
  },
  tituloSeccion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 15,
    textAlign: 'center',
  },
  tituloConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 15,
  },
  tituloSinMargen: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D4037',
  },
  filaIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  videoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  botonYouTube: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonYouTubeTexto: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Insumos
  texto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 25,
    fontFamily: 'arial',
    color: '#5D4037',
    marginBottom: 10,
    marginLeft: 10
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  contadorSeleccionados: {
    textAlign: 'center',
    color: '#5D4037',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imagen: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  Logo: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: screenWidth - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  boton: {
    fontFamily: 'arial',
    fontSize: 15,
    textAlign: 'center',
  },
  img1: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 90,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  counterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 6
  },

  // Sección productos
  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productoSeleccionado: {
    backgroundColor: '#F3E5F5',
    borderColor: '#5D4037',
    borderWidth: 2,
  },
  productoCheckbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#5D4037',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  productoCheckboxSeleccionado: {
    backgroundColor: '#5D4037',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonContador: {
    width: 40,
    height: 40,
    backgroundColor: '#5D4037',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotonContador: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cantidad: {
    marginHorizontal: 3,
    fontSize: 24,
    color: '#5D4037',
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'center',
  },
  boton1: {
    backgroundColor: "#4CAF50",
    height: 50,
    width: 90,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 5,
    fontFamily: 'arial'
  },
  boton2: {
    backgroundColor: "red",
    height: 50,
    width: 90,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 5,
    fontFamily: 'arial'
  },

  // Nota
  notaContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    marginBottom: 10,
  },
  notaFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notaText: {
    flex: 1,
    fontSize: 12,
    color: '#2E7D32',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  avisoFalta: {
    textAlign: 'center',
    color: '#5D4037',
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 6,
  },
  botonDeshabilitado: {
    backgroundColor: '#CCCCCC',
  },

  // Modal imagen ampliada
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagenAmpliada: {
    width: '95%',
    height: '80%',
  },
});