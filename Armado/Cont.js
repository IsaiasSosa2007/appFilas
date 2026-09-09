import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Dimensions, Linking} from 'react-native';
import { useState } from 'react';
import Home from '../assets/Home.png';
import Perfil from '../assets/perfil.png'
import { WebView } from 'react-native-webview';
const { width: screenWidth } = Dimensions.get('window');
export default function Cont({navigation}){
    
    const colores= [
      require('../assets/Cazul.jpg'),
      require('../assets/Crojo.jpg'),
      require('../assets/Crosa.jpg'),
      require('../assets/Cvio.jpg'),
    ];
    
    function Confirmar(){
      Alert.alert("¿Estás seguro?",
       "¿Querés continuar con la acción?",
      [
         {text: "No", onPress: () => Alert.alert("Cancelado!!"), style: "cancel"},
        {text: "Sí", onPress: () => navigation.navigate('Final') },
      ],
      { cancelable: false }
    );
  }
    const [productos, setProductos] = useState([
      { id: 1, imagen: require("../assets/Bolsitas.jpg"), nombre: 'Bolsas', cantidad :0, seleccionado: false },
      { id: 2, imagen: require("../assets/Carton.jpg"), nombre: 'Carton', cantidad: 0, seleccionado: false },
      { id: 3, imagen: require("../assets/Brillo.jpg"), nombre: 'Brillo', cantidad: 0, seleccionado: false },
      { id: 4, nombre: 'Color', colores: colores, colorIndex: 0, cantidad: 0, seleccionado: false },
      { id: 5, imagen: require("../assets/Prd2.png"), nombre: 'Producto final', cantidad:0, seleccionado: false},
    ]);
    
    let cantidadProductosFinal=[];
    function igualarArray(){
      cantidadProductosFinal[0]=productos[4];
      console.log("oasfjsdoñifkañdlsk");
      
      console.log(cantidadProductosFinal[0]); 
    }
  
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
  
  function calcularTotal() {
    const bolsa = productos.find(pro => pro.nombre === 'Bolsas');
    const carton = productos.find(pro => pro.nombre === 'Carton');
    const color = productos.find(pro => pro.nombre === 'Color');

    if(!bolsa.seleccionado || !carton.seleccionado || !color.seleccionado) return 0;
    
    return Math.min(bolsa.cantidad, carton.cantidad, color.cantidad);
  }
  
  const generarComprobante = () => {
    const productosSeleccionados = productos.filter(pro => pro.seleccionado);
    const cantidadProductos= productos.filter(pro=>pro.cantidad>0);
    if (productosSeleccionados.length < 5) {// preguntarle a marcos si la cantidad de materiales puede ser 0, o si puede haber un faltante por completo del material
      alert('selecciones todos los materiales');
      return;
    }
    else if(cantidadProductos.length<5){
    alert("seleccione una cantidad mayor a 0");
    return;
    }

    navigation.navigate('Fallas', {
      productos: 'Bengala',
      productosSeleccionados: productosSeleccionados,
      totalBengalas: cantidadProductosFinal[0].cantidad,
    });
  };

  const cambiarColor = (id) =>{
    setProductos(prev => prev.map( pro=> 
      pro.id === id
      ?{...pro, colorIndex: (pro.colorIndex +1)% pro.colores.length}
      :pro
    )
  );
  }
  
  const abrirEnYouTube = () => {
    Linking.openURL('https://youtu.be/rioebQkgzKk');
  };

  const productosSeleccionadosCount = productos.filter(p => p.seleccionado).length;
  const youtubeEmbedUrl = 'https://youtu.be/rioebQkgzKk';
    return( 
     
    <View style= {styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} style={styles.logo}/>
        <Text style={styles.tituloHeader}>F. I. L. A. S.</Text> 
      </View>
      <ScrollView style={styles.contenido} showsVerticalScrollIndicator={false}>

        {/*  LOGO BENGALA GRANDE */}
         <View style={styles.logoContainer}>
          <View style={styles.Logo}>
            <Image 
              source={require('../assets/Prd2.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.pizzaText}>Armado de Bengalas</Text>
          </View>
          </View>

        {/* Insumoss */}  
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Insumos:</Text>
          <Text style={styles.texto}>• Bolsas celofan</Text>
          <Text style={styles.texto}>• Bengalas</Text>
          <Text style={styles.texto}>• Cartones</Text>
          <Text style={styles.texto}>• Brillos</Text>
        </View>
      {/* VIDEO TUTORIAL */}    
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
            <Text style={styles.videoTitle}>Tutorial: Armado de bengala paso a paso</Text>
            <Text style={styles.videoDescription}>
              Aprende a realizar el armado de bengalas, listo para el mercado
            </Text>
            <TouchableOpacity style={styles.botonYouTube} onPress={abrirEnYouTube}>
              <Text style={styles.botonYouTubeTexto}>📺 Abrir en YouTube</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    {/* Paso a Paso */}      
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>📝 Paso a Paso</Text>
        <View style={styles.pasosContainer}>
          <View style={styles.pasoItem}>
            <View style={styles.pasoHeader}>
              <Text style={styles.pasoNumero}>1</Text>
              <Text style={styles.pasoTitulo}>Agarrar bolsas</Text>
              <Image source={require("../assets/Bolsitas.jpg")} style={styles.imagen}/>
            </View>
            <Text style={styles.pasoDescripcion}>Abrir bolsas</Text>
          </View>

          <View style={styles.pasoItem}>
            <View style={styles.pasoHeader}>
              <Text style={styles.pasoNumero}>2</Text>
              <Text style={styles.pasoTitulo}>Poner cartones</Text>
              <Image source={require("../assets/Carton.jpg")} style={styles.imagen}/>
            </View>
            <Text style={styles.pasoDescripcion}>Colocar carton dentro de la bolsa</Text>
          </View>
        
          <View style={styles.pasoItem}>
            <View style={styles.pasoHeader}>
              <Text style={styles.pasoNumero}>3</Text>
              <Text style={styles.pasoTitulo}>Agarrar bengala</Text>
               <Image source={require("../assets/Prd2.png")} style={styles.imagen}/>
            </View>
            <Text style={styles.pasoDescripcion}>Colocar bengala dentro de la bolsa</Text>
          </View>
        
          <View style={styles.pasoItem}>
            <View style={styles.pasoHeader}>
              <Text style={styles.pasoNumero}>4</Text>
              <Text style={styles.pasoTitulo}>Colocar brillos</Text>
              <Image source={require("../assets/Brillo.jpg")} style={styles.imagen}/> 
            </View>
            <Text style={styles.pasoDescripcion}>Colocar carton dentro de la bolsa</Text>
          </View>
        </View>
      </View>
    {/* Contadorr  */}
   
              
           
    <View style={styles.seccion}>   
      <Text style={styles.tituloSeccion}>Insumos</Text>
      <View style={styles.infoBox}>
      <Text style={styles.infoText}>Selecciona los insumos que vas a utilizar en esta producción</Text>
      <Text style={styles.contadorSeleccionados}>
        {productosSeleccionadosCount} de {productos.length} insumos seleccionados
      </Text>
      </View>

        <Text style={styles.tituloSeccion}>Seleccionar Cantidad</Text>
          {productos.map ((producto) =>(
          <View 
            key={producto.id} 
            style={[ styles.productoContainer, producto.seleccionado && styles.productoSeleccionado ]}
          >
          <View style={styles.leftGroup}>
            <TouchableOpacity 
                style={[styles.productoCheckbox, producto.seleccionado && styles.productoCheckboxSeleccionado]}
                onPress={() => toggleSeleccion(producto.id)}
            >
                {producto.seleccionado && <Text style={styles.checkmark}> ✓ </Text>}  
            </TouchableOpacity>
            {producto.colores ?(
              <TouchableOpacity onPress={() => cambiarColor(producto.id)}>
              <Image source={producto.colores[producto.colorIndex]} style={styles.img1} />
              </TouchableOpacity>
              ): (
                  <Image source={producto.imagen} style={styles.img1}/>
              )}
          </View>
          <View style={styles.rightGroup}>
          <View style={styles.counterBox}>   
            <View style={styles.contadorContainer}>
                <TouchableOpacity 
                  style={styles.botonContador}
                  onPress={() => disminuirCantidad(producto.id)}>
                  <Text style={styles.textoBotonContador}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.cantidad}>
                  {producto.cantidad} 
                </Text>
                
                <TouchableOpacity 
                  style={styles.botonContador}
                  onPress={() => aumentarCantidad(producto.id)}
                >
                  <Text style={styles.textoBotonContador}>+</Text>
                </TouchableOpacity>
             
              </View>
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
      {/* FOOTER */}  
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
                    productosSeleccionadosCount === 0 && styles.botonDeshabilitado
                  ]}
                  onPress={()=>{
                    igualarArray();
                    generarComprobante();
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  }}
                  disabled={productosSeleccionadosCount === 0}
                >
                  <Text style={styles.textoBotonFooter}>
                    Continuar ({productosSeleccionadosCount}) →
                  </Text>
                </TouchableOpacity>
              </View>
              
  </View>
     
      
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D98F0E',
  },
   contenido: { 
    flex: 1, 
    padding: 20 
  },
  //Header
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
  //LOGO bengala 
  image: {
    width: 120,
    height: 120,
    marginBottom: 15,
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
  pasoDescripcion: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginLeft: 42,
  },
  //Video
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
//insumos
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
   
  img1 :{
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
  //seccion produuctos
  productoContainer :{
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
  textoBotonContador :{
    color:'white',
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

  boton1 :{
    backgroundColor: "#4CAF50", 
    height: 50, 
    width: 90, 
    borderRadius: 8, 
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"row",
    marginRight: 5,
    fontFamily: 'arial'
  },
  boton2: {
    backgroundColor: "red", 
    height: 50, 
    width: 90, 
    borderRadius: 8, 
    justifyContent:"center", 
    alignItems:"center", 
    flexDirection:"row",
    marginLeft:5,
    fontFamily: 'arial'
  },
  //
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
  
  //Footerrr
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
