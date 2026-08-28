import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions, } from 'react-native';
import { WebView } from 'react-native-webview';

const { width: screenWidth } = Dimensions.get('window');

const ChipaReceta = ({ navigation }) => {
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nombre: 'Almidon', imagen: require("../assets/mandioca.jpg"), cantidad: 0, unidad: 'gramos', seleccionado: false, medida: 'taza' },
    { id: 2, nombre: 'Queso rallado', imagen: require("../assets/quesoRallado.jpg"),  cantidad: 0, unidad: 'gramos', seleccionado: false },
    { id: 3, nombre: 'Huevos', imagen: require("../assets/huevos.jpg"),  cantidad: 0, unidad: 'unidades', seleccionado: false },
    { id: 4, nombre: 'Leche', imagen: require("../assets/leche.jpg"), cantidad: 0, unidad: 'ml', seleccionado: false },
    { id: 5, nombre: 'Manteca', imagen: require("../assets/mantecaa.jpg"), cantidad: 0, unidad: 'gramos', seleccionado: false },
    { id: 6, nombre: 'Sal', imagen: require("../assets/sal.jpg"), cantidad: 0, unidad: 'gramos', seleccionado: false },
    
  ]);
  const medidaImgs = {
    taza: require('../assets/taza.png'),
    cuchara: require('../assets/cuchara.png'),
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

  const toggleSeleccion = (id) => {
    setIngredientes(prev => prev.map(ing => 
      ing.id === id ? { ...ing, seleccionado: !ing.seleccionado } : ing
    ));
  };
  function calcularTotal() {
    const almidon   = ingredientes.find(i => i.nombre === 'Almidon')   || { seleccionado: false, cantidad: 0 };
    const queso     = ingredientes.find(i => i.nombre === 'Queso rallado') || { seleccionado: false, cantidad: 0 };
    const huevos   = ingredientes.find(i => i.nombre === 'Aceite')   || { seleccionado: false, cantidad: 0 };
    const leche     = ingredientes.find(i => i.nombre === 'Agua')     || { seleccionado: false, cantidad: 0 };
    const manteca     = ingredientes.find(i => i.nombre === 'Sal')      || {seleccionado: false, cantidad: 0};
    const sal     = ingredientes.find(i => i.nombre === 'Salsa')    || {seleccionado: false, cantidad: 0};
   
    if (!almidon.seleccionado || !queso.seleccionado || !huevos.seleccionado || !leche.seleccionado ||!manteca.seleccionado ||!sal.seleccionado  ) return 0;

    return Math.min(almidon.cantidad, queso.cantidad, huevos.cantidad, leche.cantidad, manteca.cantidad, sal.cantidad);
  }
  const irAComprobante = () => {
    const ingredientesSeleccionados = ingredientes.filter(ing => ing.seleccionado);
    if (ingredientesSeleccionados.length === 0) {
      alert('Por favor selecciona al menos un ingrediente');
      return;
    }
    navigation.navigate('ComprobantePA', {
      comida: 'Chipa',
      ingredientesSeleccionados: ingredientesSeleccionados,
      total: calcularTotal(),
    });
  };
const abrirEnYouTube = () => {
    Linking.openURL('https://youtu.be/rioebQkgzKk');
  };

  const ingredientesSeleccionadosCount = ingredientes.filter(ing => ing.seleccionado).length;

  // ✅ LINK CORREGIDO - Convertido a formato embed
  const youtubeEmbedUrl = 'https://www.youtube.com/embed/rioebQkgzKk?rel=0&modestbranding=1&playsinline=1';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
      </View>
      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>

        {/*LOGO CHIPA*/}
        <View style={styles.logoContainer}>
          <View style={styles.chipaLogo}>
             <Image 
                source={require('../assets/chipa.jpg')}
                style={styles.chipaImage}
                resizeMode="contain"
              />
              <Text style={styles.chipaText}>CHIPA CASERO</Text>
          </View>
        </View>
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Ingredientes:</Text>
          <Text style={styles.texto}>• 2 tazas almidon</Text>
          <Text style={styles.texto}>• 2 huevos</Text>
          <Text style={styles.texto}>• 200g queso semiduro</Text>
          <Text style={styles.texto}>• 100g de manteca- 1 unidad</Text>
          <Text style={styles.texto}>• 1 cucharadita de Sal a gusto</Text>
          <Text style={styles.texto}>• 100ml de leche</Text>
        </View>
        
        {/* 📹 VIDEO TUTORIAL CON LINK CORRECTO */}
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
              <Text style={styles.videoTitle}>Tutorial: Chipa Casero Paso a Paso</Text>
              <Text style={styles.videoDescription}>
                Aprende a preparar la masa, agregar ingredientes y hornear el chipa perfecto
              </Text>
              <TouchableOpacity style={styles.botonYouTube} onPress={abrirEnYouTube}>
                <Text style={styles.botonYouTubeTexto}>📺 Abrir en YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 📝 SECCIÓN PASO A PASO */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>📝 Paso a Paso</Text>
          <View style={styles.pasosContainer}>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>1</Text>
                <Text style={styles.pasoTitulo}>Mezclar almidón con sal</Text>
                <Image source={require("../assets/almySal.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>En un bowl grande, mezclar las 2 tazas de almidon y la sal</Text>
            </View>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>2</Text>
                <Text style={styles.pasoTitulo}>Agregar líquidos</Text>
                <Image source={require("../assets/almyQueso.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Incorporar huevos, manteca derretida y queso rallado</Text>
            </View>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>3</Text>
                <Text style={styles.pasoTitulo}>Amasar</Text>
                <Image source={require("../assets/amasar.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Empezar a amasar agregando la leche</Text>
            </View>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>4</Text>
                <Text style={styles.pasoTitulo}>Formar bollitos</Text>
                <Image source={require("../assets/almyBollo.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Empezar a amasar agregando la leche</Text>
            </View>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <Text style={styles.pasoNumero}>5</Text>
                <Text style={styles.pasoTitulo}>Hornear</Text>
                <Image source={require("../assets/bolloHorno.jpg")} style={styles.pasoImagen}/>
              </View>
              <Text style={styles.pasoDescripcion}>Empezar a amasar agregando la leche</Text>
            </View>            
          </View>
        </View>
        {/* 🥘 SECCIÓN INGREDIENTES */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>🥘 Ingredientes</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Selecciona los ingredientes que vas a utilizar en esta producción</Text>
              <Text style={styles.contadorSeleccionados}>
                {ingredientesSeleccionadosCount} de {ingredientes.length} ingredientes seleccionados
              </Text>
            </View>

            {ingredientes.map((ingrediente) => (
            <View 
              key={ingrediente.id} 
              style={[styles.ingredienteContainer, ingrediente.seleccionado && styles.ingredienteSeleccionado]}
            >
             <View style={styles.leftGroup}>
              <TouchableOpacity 
                style={[styles.ingredienteCheckbox, ingrediente.seleccionado && styles.ingredienteCheckboxSeleccionado]}
                onPress={() => toggleSeleccion(ingrediente.id)}
              >
                {ingrediente.seleccionado && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Image source={ingrediente.imagen} style={styles.img}/>

             </View>
             <View style={styles.rightGroup}>
             <View style={styles.counterBox}>  
              <View style={styles.contadorContainer}>
                <TouchableOpacity 
                  style={styles.botonContador}
                  onPress={() => disminuirCantidad(ingrediente.id)}
                  disabled={!ingrediente.seleccionado}
                >
                  <Text style={styles.textoBotonContador}>-</Text>
                </TouchableOpacity>
          
                <Text style={[
                  styles.cantidad,
                  !ingrediente.seleccionado && styles.cantidadDeshabilitada
                ]}>
                  {ingrediente.cantidad} 
                </Text>
                <TouchableOpacity 
                  style={styles.botonContador}
                  onPress={() => aumentarCantidad(ingrediente.id)}
                  disabled={!ingrediente.seleccionado}
                >
                  <Text style={styles.textoBotonContador}>+</Text>
                </TouchableOpacity>
              </View>
              {ingrediente.medida && medidaImgs[ingrediente.medida] && (
                <Image source={medidaImgs[ingrediente.medida]} style={styles.medidaImg} />
              )}
              </View>
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
        <TouchableOpacity style={styles.botonFooter} onPress={() => navigation.goBack()}>
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
  seccion: {
    marginBottom: 25,
  },
  img :{
    width: 60, 
    height: 60, 
    borderRadius: 12,
    marginRight: 90,
  },
   // LOGO CHIPA
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  chipaLogo: {
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
  chipaImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  chipaText: {
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
   ingredienteCheckboxSeleccionado: {
    backgroundColor: '#5D4037',
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
  botonDeshabilitado: {
    backgroundColor: '#CCCCCC',
  },
  textoBotonFooter: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  
});

export default ChipaReceta;