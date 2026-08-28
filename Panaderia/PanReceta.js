import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Linking
} from 'react-native';
import { WebView } from 'react-native-webview';

const { width: screenWidth } = Dimensions.get('window');

const PanReceta = ({ navigation }) => {
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nombre: 'Harina', imagen: require("../assets/harina.png"), cantidad: 0, unidad: 'gramos', seleccionado: false, medida: 'taza'   },
    { id: 2, nombre: 'Levadura', imagen: require("../assets/levadura.png"), cantidad: 0, unidad: 'gramos', seleccionado: false },
    { id: 3, nombre: 'Agua', imagen: require("../assets/agua.jpg"), cantidad: 0, unidad: 'ml', seleccionado: false },
    { id: 4, nombre: 'Sal', imagen: require("../assets/sal.jpg"), cantidad: 0, unidad: 'gramos', seleccionado: false },
    { id: 5, nombre: 'Azucar', imagen: require("../assets/azucar.jpg"), cantidad: 0, unidad: 'cucharadita', seleccionado: false },
    { id: 6, nombre: 'Manteca', imagen: require("../assets/manteca.jpg"), cantidad: 0, unidad: 'gramos', seleccionado: false }
  ]);
  const medidaImgs = {
    taza: require('../assets/taza.png'),
    cuchara: require('../assets/cuchara.png'),
  };
  const toggleSeleccion = (id) => {
    setIngredientes(prev => prev.map(ing => 
      ing.id === id ? { ...ing, seleccionado: !ing.seleccionado } : ing
    ));
  };

  const aumentarCantidad = (id) => {
    setIngredientes(prev => prev.map(ing => 
      ing.id === id ? { ...ing, cantidad: ing.cantidad + 1 } : ing
    ));
  };

  const disminuirCantidad = (id) => {
    setIngredientes(prev => prev.map(ing => 
      ing.id === id && ing.cantidad > 1 ? { ...ing, cantidad: ing.cantidad - 1 } : ing
    ));
  };

  function calcularTotal() {
    const harina   = ingredientes.find(i => i.nombre === 'Harina')   || {seleccionado: false, cantidad: 0 };
    const levadura = ingredientes.find(i => i.nombre === 'Levadura') || {seleccionado: false, cantidad: 0 };
    const agua     = ingredientes.find(i => i.nombre === 'Agua')     || {seleccionado: false, cantidad: 0 };
    const sal      = ingredientes.find(i => i.nombre === 'Sal')      || {seleccionado: false, cantidad: 0};
    const azucar   = ingredientes.find(i => i.nombre === 'Azucar')   || {seleccionado: false, cantidad: 0};
    const manteca  = ingredientes.find(i => i.nombre === 'Manteca')  || {seleccionado: false, cantidad: 0}; 
    
    if (!harina.seleccionado || !levadura.seleccionado || !agua.seleccionado || !sal.seleccionado || !azucar.seleccionado || !manteca.seleccionado) return 0;

    return Math.min(harina.cantidad, levadura.cantidad, agua.cantidad, sal.cantidad, azucar.cantidad, manteca.cantidad);
  }
  const irAComprobante = () => {
    const ingredientesSeleccionados = ingredientes.filter(ing => ing.seleccionado);
    
    if (ingredientesSeleccionados.length === 0) {
      alert('Por favor selecciona al menos un ingrediente');
      return;
    }

    navigation.navigate('ComprobantePA', {
      comida: 'Pan',
      ingredientesSeleccionados: ingredientesSeleccionados,
      total: calcularTotal(),
    });
  };

  const abrirEnYouTube = () => {
    Linking.openURL('https://youtu.be/ejemplo-pan'); // Cambiar por link real del video de pan
  };

  const ingredientesSeleccionadosCount = ingredientes.filter(ing => ing.seleccionado).length;

  // URL de ejemplo - reemplazar con video real de pan
  const youtubeEmbedUrl = 'https://youtu.be/TLYdhs3AmO4';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A.S.</Text> 
      </View>

      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
        
        {/* 🍞 LOGO PAN GRANDE */}
        <View style={styles.logoContainer}>
          <View style={styles.panLogo}>
            <Image 
              source={require('../assets/pan.png')}
              style={styles.panImage}
              resizeMode="contain"
            />
            <Text style={styles.panText}>PAN CASERO</Text>
          </View>
        </View>
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Ingredientes:</Text>
          <Text style={styles.texto}>• 4 tazas harina</Text>
          <Text style={styles.texto}>• 1 taza levadura</Text>
          <Text style={styles.texto}>• 1 cucharada aceite</Text>
          <Text style={styles.texto}>• 1 taza agua tibia</Text>
          <Text style={styles.texto}>• Sal a gusto</Text>
          <Text style={styles.texto}>• Pure de tomate</Text>
          <Text style={styles.texto}>• Queso Muzzarella</Text>
        </View>

        {/* 📹 VIDEO TUTORIAL */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>🎥 Video Tutorial</Text>
          <View style={styles.videoContainer}>
            <View style={styles.videoWrapper}>
              <WebView
                source={{ uri: youtubeEmbedUrl }}
                style={styles.videoPlayer}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scrollEnabled={false}
              />
            </View>
            
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>Tutorial: Pan Casero Paso a Paso</Text>
              <Text style={styles.videoDescription}>
                Aprende a preparar masa de pan, técnicas de amasado y horneado perfecto
              </Text>
              <TouchableOpacity style={styles.botonYouTube} onPress={abrirEnYouTube}>
                <Text style={styles.botonYouTubeTexto}>📺 Abrir en YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 📝 SECCIÓN PASO A PASO MEJORADA */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>📝 Paso a Paso</Text>
          <View style={styles.pasosContainer}>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>1</Text>
                <Text style={styles.pasoTitulo}>Mezclar ingredientes secos</Text>
                <Image source={require("../assets/masa.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>En un bowl grande, mezclar 500g de harina, 10g de sal y 15g de levadura seca. Formar un volcán en el centro.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>2</Text>
                <Text style={styles.pasoTitulo}>Agregar líquidos</Text>
                <Image source={require("../assets/masaL.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Incorporar 260ml de agua tibia, 1 cucharadita de azúcar y 50g de manteca derretida. Mezclar hasta integrar.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>3</Text>
                <Text style={styles.pasoTitulo}>Amasar</Text>
                <Image source={require("../assets/amasar.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Amasar durante 10-15 minutos sobre superficie enharinada hasta obtener una masa suave, elástica y no pegajosa.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>4</Text>
                <Text style={styles.pasoTitulo}>Primera fermentación</Text>
                <Image source={require("../assets/masaenBowl.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Cubrir el bowl con film y dejar reposar por 1-2 horas en lugar tibio hasta que duplique su volumen.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>5</Text>
                <Text style={styles.pasoTitulo}>Formar las piezas</Text>
                <Image source={require("../assets/bollos.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Desgasificar la masa, dividir en porciones y formar bollos. Colocar en bandeja enharinada.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>6</Text>
                <Text style={styles.pasoTitulo}>Segunda fermentación</Text>
                <Image source={require("../assets/bolloGrande.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Dejar reposar las piezas por 30-45 minutos hasta que aumenten un 50% su tamaño.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>7</Text>
                <Text style={styles.pasoTitulo}>Hornear</Text>
                <Image source={require("../assets/bolloHorno.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Hornear a 180°C por 25-30 minutos hasta que estén dorados y suenen huecos al golpear la base.</Text>
            </View>

            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>8</Text>
                <Text style={styles.pasoTitulo}>Enfriar y servir</Text>
                <Image source={require("../assets/panListo.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Dejar enfriar sobre rejilla por lo menos 30 minutos antes de cortar. Servir tibio.</Text>
            </View>
          </View>
        </View>

        {/* 🥘 SECCIÓN INGREDIENTES MEJORADA */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>🥘 Ingredientes</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Selecciona los ingredientes que vas a utilizar en esta producción</Text>
            <Text style={styles.contadorSeleccionados}>
              {ingredientesSeleccionadosCount} de {ingredientes.length} ingredientes seleccionados
            </Text>
          </View>

          {ingredientes.map((ingrediente) => (
            <View key={ingrediente.id} style={[
              styles.ingredienteContainer,
              ingrediente.seleccionado && styles.ingredienteSeleccionado
            ]}>
              <TouchableOpacity 
                style={[styles.ingredienteCheckbox, ingrediente.seleccionado && styles.ingredienteCheckboxSeleccionado]}
                onPress={() => toggleSeleccion(ingrediente.id)}
              >
                {ingrediente.seleccionado && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              
              <Text style={[
                styles.ingredienteNombre,
                ingrediente.seleccionado && styles.ingredienteNombreSeleccionado
              ]}>
                {ingrediente.nombre}
              </Text>
              
              <View style={styles.contadorContainer}>
                <TouchableOpacity 
                  style={[styles.botonContador, !ingrediente.seleccionado && styles.botonDeshabilitado]}
                  onPress={() => disminuirCantidad(ingrediente.id)}
                  disabled={!ingrediente.seleccionado}
                >
                  <Text style={styles.textoBotonContador}>-</Text>
                </TouchableOpacity>
                
                <Text style={[
                  styles.cantidad,
                  !ingrediente.seleccionado && styles.cantidadDeshabilitada
                ]}>
                  {ingrediente.cantidad} {ingrediente.unidad}
                </Text>
                
                <TouchableOpacity 
                  style={[styles.botonContador, !ingrediente.seleccionado && styles.botonDeshabilitado]}
                  onPress={() => aumentarCantidad(ingrediente.id)}
                  disabled={!ingrediente.seleccionado}
                >
                  <Text style={styles.textoBotonContador}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <View style={styles.notaContainer}>
            <Text style={styles.notaText}>
              💡 Solo los ingredientes seleccionados se registrarán en el sistema de producción
            </Text>
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.botonFooter} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBotonFooter}>← Volver</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.botonFooter, 
            styles.botonConfirmar, 
            ingredientesSeleccionadosCount === 0 && styles.botonDeshabilitado
          ]}
          onPress={irAComprobante}
          disabled={ingredientesSeleccionadosCount === 0}
        >
          <Text style={styles.textoBotonFooter}>
            Continuar ({ingredientesSeleccionadosCount}) →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  },
  tituloHeader: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#FFF', 
    letterSpacing: 2 
  },
  logo :{
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: -6,
    marginTop: 50,
  },
  contenido: { 
    flex: 1, 
    padding: 20 
  },
  
  // 🍞 LOGO PAN
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  panLogo: {
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
  panImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  panText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
  },
  //ingredientes
  subtitulo: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#5D4037', 
    marginBottom: 8 
  },
  texto: {
     fontSize: 16, 
     color: '#333', 
     marginBottom: 4,
     fontWeight: 'bold',
  },
  medidaImg: { 
    width: 28, 
    height: 28, 
    marginLeft: 8 
  },
  
  // 🎥 SECCIÓN VIDEO
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
  videoContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
  },
  videoWrapper: {
    width: '100%',
    height: 220,
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
  
  // 📝 SECCIÓN PASOS
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
  },
  pasoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  pasoImagen: {
    width: 50, 
    height: 50, 
    borderRadius: 12,
  },
  pasoDescripcion: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginLeft: 42,
  },
  
  // 🥘 SECCIÓN INGREDIENTES
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
  ingredienteContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white',
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  ingredienteSeleccionado: {
    backgroundColor: '#F3E5F5',
    borderColor: '#5D4037',
    borderWidth: 2,
  },
  ingredienteCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#5D4037',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ingredienteCheckboxSeleccionado: {
    backgroundColor: '#5D4037',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  ingredienteNombre: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  ingredienteNombreSeleccionado: {
    color: '#5D4037',
    fontWeight: '600',
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonContador: {
    width: 30,
    height: 30,
    backgroundColor: '#5D4037',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDeshabilitado: {
    backgroundColor: '#CCCCCC',
  },
  textoBotonContador: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cantidad: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#5D4037',
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
  cantidadDeshabilitada: {
    color: '#999',
  },
  notaContainer: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notaText: {
    fontSize: 12,
    color: '#2E7D32',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  // 🎯 FOOTER
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
    backgroundColor: '#4CAF50' 
  },
  botonDeshabilitado: {
    backgroundColor: '#CCCCCC',
  },
  textoBotonFooter: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
});

export default PanReceta;