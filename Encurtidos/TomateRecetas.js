import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Linking, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const { width: screenWidth } = Dimensions.get('window');

const TomateRecetas = ({ navigation }) => {

  const [ingrediente, setIngrediente] = useState([
    { id: 1, imagen: require("../assets/mediano.jpg"), nombre: 'Frascos', cantidad: 1, unidad: ' unidad', seleccionado: false },
    { id: 2, imagen: require("../assets/tomate.png"), nombre: 'Tomates', cantidad: 0, unidad: ' kg', seleccionado: false },
    { id: 3, imagen: require("../assets/azucar.jpg"), nombre: 'Azucar', cantidad: 0, unidad: ' gramos', seleccionado: false, medida: 'Taza' },
    { id: 4, imagen: require("../assets/limon.jpg"), nombre: 'Limon', cantidad: 0, unidad: ' ml', seleccionado: false },
  ]);

  const [frascos, setFrascos] = useState([
    { id: 1, tipo: 'Pequeño', imagen: require('../assets/chico.jpg'), agregada:true, seleccionado: false, cantidad: 0 },
    { id: 2, tipo: 'Mediano', imagen: require('../assets/mediano.jpg'), agregada:true, seleccionado: false, cantidad: 0 },
    { id: 3, tipo: 'Grande', imagen: require('../assets/grande.jpg'), agregada:true, seleccionado: false, cantidad: 0 },
  ]);

  const medidaImgs = {
    Taza: require('../assets/taza.png'),
  };

  const aumentarCantidad = (id) => {
    setIngrediente(prev => prev.map(ing => {
      if (ing.id !== id) return ing;
      if (ing.nombre === 'Frascos') {
        return { ...ing, cantidad: ing.cantidad + 10 };
      }
      return { ...ing, cantidad: ing.cantidad + 1 };
    }));
  };

const disminuirCantidad = (id) => {
    setIngrediente(prev => prev.map(ing => {
      if (ing.id !== id) return ing;
      if (ing.nombre === 'Frascos') {
        const next = Math.max(0, ing.cantidad - 1);
        return { ...ing, cantidad: next };
      }
      const next = Math.max(0, ing.cantidad - 1);
      return { ...ing, cantidad: next };
    }));
  };

  const toggleSeleccion = (id) => {
    setIngrediente(prev => prev.map(ing => 
      ing.id === id ? { ...ing, seleccionado: !ing.seleccionado } : ing
    ));
  };

  function  calcularTotalI() {
    const frasco = ingrediente.find(i => i.nombre === 'Frascos');
    const tomate = ingrediente.find(i => i.nombre === 'Tomates');
    const azucar = ingrediente.find(i => i.nombre === 'Azucar');
    const limon  = ingrediente.find(i => i.nombre === 'Limon');

    if (!frasco?.seleccionado || !tomate?.seleccionado || !azucar?.seleccionado || !limon?.seleccionado) return 0;

    return frasco.cantidad;
  }
  const seleccionarFrasco = (id) => {
    setFrascos(prev => prev.map(f => 
      f.id === id ? { ...f, seleccionado: !f.seleccionado } : { ...f, seleccionado: false, cantidad: 0 }      
    ));
  };
 /*const seleccionarFrasco = (id) => {
    setFrascos(prev => prev.map(f => {
      if (f.id === id) {
        if (f.seleccionado) return { ...f, seleccionado: false, cantidad: 0 };
        return { ...f, seleccionado: true, cantidad: f.cantidad + 1 };
      }
      return { ...f, seleccionado: false, cantidad: 0 };
    }));
  };*/

  const frascoSeleccionado = frascos.find(f => f.seleccionado);

  const generarComprobante = () => {
    const ingredienteSeleccionados = ingrediente.filter(ing => ing.seleccionado);
    if (!frascoSeleccionado) {
      alert('Seleccione un frasco para continuar');
      return;
    }
    if (ingredienteSeleccionados.length === 0) {
      alert('Seleccione insumos usados');
      return;
    }
    navigation.navigate('ComprobanteEN', {
      recetas: 'Tomate',
      ingredienteSeleccionados,
      frascoSeleccionado,
     totalIngredientes: calcularTotalI(),
    });
  };

    const abrirEnYouTube = () => {
        Linking.openURL('https://youtu.be/rioebQkgzKk');
    };
    
    const ingredienteSeleccionadosCount = ingrediente.filter(ing => ing.seleccionado).length;
    
      // ✅ LINK CORREGIDO - Convertido a formato embed
      const youtubeEmbedUrl = 'https://www.youtube.com/embed/rioebQkgzKk?rel=0&modestbranding=1&playsinline=1';
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/Logo.png')} style={styles.logo}/>
          <Text style={styles.tituloHeader}>F. I. L. A. S.</Text>
        </View>
    <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>
       {/* LOGO Tomate GRANDE*/}  
                <View style={styles.logoContainer}>
                  <View style={styles.tomateLogo}>
                    <Image 
                      source={require('../assets/tomate.png')}
                      style={styles.tomateImage}
                      resizeMode="contain"
                    />
                      <Text style={styles.tomateText}>MERMELADA DE TOMATE</Text>
                  </View>
                </View>
      
        
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Ingredientes</Text>
          <Text style={styles.paso}>• 1 kg tomates maduros</Text>
          <Text style={styles.paso}>• 2 tazas Azúcar blanco </Text>
          <Text style={styles.paso}>• 1 Limon</Text>
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
                        <Text style={styles.videoTitle}>Tutorial: Mermelada de Tomate Casera Paso a Paso</Text>
                        <Text style={styles.videoDescription}>
                          Aprende a preparar la mermelada y mezclar ingredientes de forma perfecta
                        </Text>
                        <TouchableOpacity style={styles.botonYouTube} onPress={abrirEnYouTube}>
                          <Text style={styles.botonYouTubeTexto}>📺 Abrir en YouTube</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
                            
                <View style={styles.seccion}>
                  <Text style={styles.tituloSeccion}>📝 Paso a Paso</Text>
                    <View style={styles.pasosContainer}>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>1</Text>
                         <Text style={styles.pasoTitulo}>Lavar muy bien todos los tomates</Text>
                         <Image source={require("../assets/tomateLavado.jpg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Lavar Tomates</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>2</Text>
                         <Text style={styles.pasoTitulo}>Hacerle un corte en cruz al tomate</Text>
                         <Image source={require("../assets/tomatex.jpg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Hacer un corte en cruz en el tomate para cortarlos con mas facilidad</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>3</Text>
                         <Text style={styles.pasoTitulo}>Hervir en una olla</Text>
                         <Image source={require("../assets/hervirTomates.jpg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Hervir tomates por 30 segundos</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>4</Text>
                         <Text style={styles.pasoTitulo}>Pelar y cortar tomates</Text>
                         <Image source={require("../assets/cortarTomates.jpg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Pelar tomates previamente cocinados y cortarlos en cuadraditos</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>5</Text>
                         <Text style={styles.pasoTitulo}>Hervir tomates cortados</Text>
                         <Image source={require("../assets/ollaTomate.jpg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Agregar azucar y limon a los tomates</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>6</Text>
                         <Text style={styles.pasoTitulo}>hervir tomates</Text>
                         <Image source={require("../assets/tomateCocinando1.jpeg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Lavar Tomates</Text>
                      </View>
                      <View style={styles.pasoItem}>
                        <View style={styles.pasoHeader}>
                         <Text style={styles.pasoNumero}>6</Text>
                         <Text style={styles.pasoTitulo}>Consistencia de mermelada</Text>
                         <Image source={require("../assets/tomateCocinando2.jpeg")} style={styles.pasoImagen}/>
                        </View>
                        <Text style={styles.pasoDescripcion}>Lavar Tomates</Text>
                      </View>
                    </View>
                </View>

       
                <View style={styles.seccion}>
                  <Text style={styles.tituloSeccion}>🥘 Ingredientes</Text>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Selecciona los ingredientes que vas a utilizar en esta producción</Text>
                    <Text style={styles.contadorSeleccionados}>
                      {ingredienteSeleccionadosCount} de {ingrediente.length} ingredientes seleccionados
                    </Text>
                  </View>
                  <View style={styles.selectorSection}>
                    <Text style={styles.subtitulo}>Frascos</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>
                      {frascos.filter(f => f.agregada).map(item => (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.itemSlider, item.seleccionado && styles.itemSeleccionado]}
                        onPress={() => seleccionarFrasco(item.id)}
                      >
                        <Image source={item.imagen} style={styles.img}/>
                        <Text style={styles.textoSlider}>{item.tipo}</Text>
                        <Text style={styles.cantidadFrasco}></Text>
                    
                          {item.seleccionado && <Text style={styles.checkmark}>✓</Text>}
                      </TouchableOpacity>
                      ))}
                    </ScrollView>
                   </View>
                    {ingrediente.map((ingrediente) => (
                    <View 
                    key={ingrediente.id} 
                    style={styles.ingredienteContainer}
                    >
                    <View style={styles.leftGroup}>
                      <TouchableOpacity
                        style={[styles.ingredienteCheckbox, ingrediente.seleccionado && styles.ingredienteSeleccionado]}
                        onPress={() => toggleSeleccion(ingrediente.id)}
                      >
                        {ingrediente.seleccionado && <Text style={styles.checkmark}>✓</Text>}
                      </TouchableOpacity>
                      <Image source={ingrediente.imagen} style={styles.img}/>
                    </View>   
                    <View style={styles.rightGroup}>
                    <View style={styles.counterBox}>
                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() => disminuirCantidad(ingrediente.id)}
                    >
                      <Text style={styles.textoBotonContador}>-</Text>
                    </TouchableOpacity>
                      <Text style={styles.cantidad}>{ingrediente.cantidad}</Text>
                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() => aumentarCantidad(ingrediente.id)}
                    >
                      <Text style={styles.textoBotonContador}>+</Text>
                    </TouchableOpacity>
                    </View>
                    {ingrediente.medida && medidaImgs[ingrediente.medida] && (
                    <Image source={medidaImgs[ingrediente.medida]} style={styles.medidaImg} />
                    )}
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
          <Text style={styles.textoBotonFooter}>← Volver</Text>
        </TouchableOpacity>
                        
        <TouchableOpacity 
          style={[
          styles.botonFooter, 
          styles.botonConfirmar, 
          ingredienteSeleccionadosCount === 0 && styles.botonDeshabilitado
          ]}
          onPress={generarComprobante}
          disabled={ingredienteSeleccionadosCount === 0}
        >
          <Text style={styles.textoBotonFooter}>
            Continuar ({ingredienteSeleccionadosCount}) →
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
   //header
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
 //LOGO TOMATE
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  tomateLogo: {
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
  tomateImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  tomateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
  },
//Ingredientes
  seccion: { 
    marginBottom: 25 
  },
  subtitulo: { 
    fontSize: 25, 
    fontFamily: 'arial', 
    fontWeight: 'bold', 
    color: '#5D4037', 
    marginBottom: 10, 
    marginLeft: 10 
  },
  paso: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
  // 🎥 SECCIÓN VIDEO
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
  //SECTOR FRASCOS
  selectorSection: { 
    paddingHorizontal: 16, 
    paddingBottom: 40, 
    marginTop: 8 
  },
  sliderContainer: { 
    marginBottom: 20 
  },
  itemSlider: { 
    alignItems: 'center', 
    marginRight: 20, 
    padding: 8, 
    borderRadius: 12, 
    borderWidth: 0 
  },
  textoSlider: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#5D4037', 
    textAlign: 'center' 
  },
  cantidadFrasco: { 
    marginTop: 6, 
    color: '#5D4037', 
    fontWeight: '700' 
  },
  //imagen
   img: { 
    width: 56, 
    height: 56, 
    borderRadius: 8, 
    marginRight: 10 
  },
   //ingredintes a seleccionar
  ingredienteContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    marginBottom: 10, 
    justifyContent: 'space-between' 
  },
  itemSeleccionado: { 
    borderColor: '#5D4037', 
    backgroundColor: 'rgba(93, 64, 55, 0.08)', 
    borderWidth: 1 
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
  ingredienteCheckbox: { 
    width: 34,
    height: 34, 
    borderWidth: 2, 
    borderColor: '#5D4037', 
    borderRadius: 6, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 10, 
    backgroundColor: 'transparent' 
  },
  ingredienteSeleccionado: { 
    backgroundColor: '#5D4037' 
  },
  checkmark: { 
    color: '#fff', 
    fontWeight: '700' 
  },
  nombreIngrediente: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#333' 
  },
  cantidadText: { 
    fontSize: 16, 
    color: '#5D4037', 
    fontWeight: '700', 
    marginRight: 8 
  },
  medidaImg: { 
    width: 28, 
    height: 28, 
    marginLeft: 8 
  },
  

  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonContador: {
    width: 50,
    height: 50,
    backgroundColor: '#5D4037',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotonContador: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cantidad: {
    marginHorizontal: 10,
    fontSize:20,
    color: '#5D4037',
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
   //nota abajo del contador
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
  //footer
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
  
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default TomateRecetas;