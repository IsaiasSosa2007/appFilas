// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Dimensions, Linking, TouchableWithoutFeedback, Modal} from 'react-native';
import { useState } from 'react';
// import Home from '../assets/Home.png';
// import Perfil from '../assets/perfil.png'
// import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width: screenWidth } = Dimensions.get('window');
export default function Cont({navigation}){
    
  const [imagenAmpliada, setImagenAmpliada] = useState(false);
    const insets = useSafeAreaInsets();

    const colores= [
      require('../assets/Cazul.jpg'),
      require('../assets/Crojo.jpg'),
      require('../assets/Crosa.jpg'),
      require('../assets/Cvio.jpg'),
    ];
    
  //   function Confirmar(){
  //     Alert.alert("¿Estás seguro?",
  //      "¿Querés continuar con la acción?",
  //     [
  //        {text: "No", onPress: () => Alert.alert("Cancelado!!"), style: "cancel"},
  //       {text: "Sí", onPress: () => navigation.navigate('Final') },
  //     ],
  //     { cancelable: false }
  //   );
  // }
  /*productos es el valor, setProductos una funcion asignada a cambiar ese valor. useState permite que se renderice la pantalla nuevamente al actualizar el valor de productos*/
  /*setProductos es una funcion a la que podemos pasarle distintas funciones como "parametro", o un nuevo array para que modifique "productos"*/
  /**useState() devuelve un array con dos elementos: una variable y una funcion. Nosotros usamos la "desestructuracion" para decir que el primer elemento es productos, y la segunda es la funcion setProductos */
  /**desestructuracion ejemplo:
   * let datos=["fulano", 18];
   * let nombre=datos[0];
   * let edad=datos[1]
   * es lo mismo que decis
   * let [nombre, edad]=datos
   * entonces 
   * let [productos, setProductos]=useState();
   * esta diciendo que productos es igual al primer elemento que devuelve useState; y setProductos es igual al segundo elemento que devuelve useState
   */
  /**aca abajo (const [productos, setProductos] = useState) estamos diciendo que productos es la primer variable que devuelve useState, la variable que usa para "renderizar"(useState no renderiza la pantalla, le indica que la variable se actualizo y debe renderizarse con el codigo de front que se haya creado) la pantalla cuando se actualiza la variable, y setProductos es la funcion que devuelve useState, la que utiliza para actualizar la variable que renderiza.*/
    const [productos, setProductos] = useState([
      { id: 1, imagen: require("../assets/Bolsitas.jpg"), nombre: 'Bolsas', cantidad :0, seleccionado: false },
      { id: 2, imagen: require("../assets/Carton.jpg"), nombre: 'Carton', cantidad: 0, seleccionado: false },
      { id: 3, imagen: require("../assets/Brillo.jpg"), nombre: 'Brillo', cantidad: 0, seleccionado: false },
      { id: 4, nombre: 'Color', colores: colores, colorIndex: 0, cantidad: 0, seleccionado: false },
      { id: 5, imagen: require("../assets/Prd2.png"), nombre: 'Producto final', cantidad:0, seleccionado: false},
    ]);
    // Estado para controlar el menú desplegable de colores
    const [colorMenuAbierto, setColorMenuAbierto] = useState(false);


    let cantidadProductosFinal=0;
    function igualarArray(){
      cantidadProductosFinal=productos[4].cantidad;
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
  
  // function calcularTotal() {
  //   const bolsa = productos.find(pro => pro.nombre === 'Bolsas');
  //   const carton = productos.find(pro => pro.nombre === 'Carton');
  //   const color = productos.find(pro => pro.nombre === 'Color');

  //   if(!bolsa.seleccionado || !carton.seleccionado || !color.seleccionado) return 0;
    
  //   return Math.min(bolsa.cantidad, carton.cantidad, color.cantidad);
  // }
  
  const generarComprobante = () => {
    const productosSeleccionados = productos.filter(pro => pro.seleccionado && pro.id!==5);
    const cantidadProductos= productos.slice(0, 4).filter(pro=>pro.cantidad>0);
    if (productosSeleccionados.length < 4 || productos[4].seleccionado===false) {// preguntarle a marcos si la cantidad de materiales puede ser 0, o si puede haber un faltante por completo del material
      alert('seleccione todas las casillas');
      return;
    }
    else if(cantidadProductos.length<4||productos[4].cantidad===0){
    alert("seleccione una cantidad mayor a 0");
    return;
    }

    navigation.navigate('Fallas', {//navega a la pantalla de fallas y le envia este objeto con estos datos
      productos: 'Bengala',
      productosSeleccionados: productosSeleccionados,//si el nombre del atributo del objeto y el nombre de la variable son iguales, se puede escribri solo (en este caso de ejmplo) productosSeleccionados,
      totalBengalas: cantidadProductosFinal,
    });
  };

  const cambiarColor = (id, index) =>{
    setProductos(prev => prev.map( pro=> 
      pro.id === id
      ?{...pro, colorIndex: index}
      :pro
    ));
  }
  
  const abrirEnYouTube = () => {
    Linking.openURL('https://youtu.be/rioebQkgzKk');
  };

  const productosSeleccionadosCount = productos.filter(p => p.seleccionado && p.id !== 5).length;//productos.filter devuelve un nuevo array en base a los productos que fueron seleccionados, y se saca su tamaño con .length, suyo valor es asignado a productosSeleccionadosCount
  const youtubeEmbedUrl = 'Video no disponible'//'https://youtu.be/rioebQkgzKk';
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
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setImagenAmpliada(true)}
    >
      <Image
        source={require('../assets/Prd2.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
    <Text style={styles.pizzaText}>Armado de Bengalas</Text>
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

        {/* Insumoss */}  
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Insumos:</Text>
          <Text style={styles.texto}>• Bolsas celofan </Text>
          <Text style={styles.texto}>• Bengalas</Text>
          <Text style={styles.texto}>• Cartones</Text>
          <Text style={styles.texto}>• Brillos</Text>
        </View>
      {/* VIDEO TUTORIAL */}    
        <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>🎥 Video Tutorial</Text>
        <Text style={styles.tituloSeccion}>(Actualmente no disponible)</Text>
        <View style={styles.videoContainer}>
          <View style={styles.videoWrapper}>
           {/* <WebView
            source={{ uri: youtubeEmbedUrl }}
            style={styles.videoPlayer}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scrollEnabled={false}
           /> */}
          </View>
                      
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>Tutorial: Armado de bengala paso a paso</Text>
            <Text style={styles.videoDescription}>
              Aprende a realizar el armado de bengalas, listo para el mercado
            </Text>
            <TouchableOpacity style={[styles.botonYouTube, styles.botonDeshabilitado]} onPress={abrirEnYouTube} disabled={true}>
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
                <View style={styles.pasosContenedor2}>
                <Text style={styles.pasoNumero}>1</Text>
                <View>
                  <Text style={styles.pasoTitulo}>Agarrar bolsas</Text>
                  <Text style={styles.pasoDescripcion}>Abrir bolsas</Text>
                </View>
                </View>
                <Image source={require("../assets/paso_1.png")} style={styles.imagen}/>
              </View>

              {/* <Text style={styles.pasoDescripcion}>
                Abrir bolsas
              </Text> */}
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
                <Image source={require("../assets/paso_2.png")} style={styles.imagen}/>
              </View>

              {/* <Text style={styles.pasoDescripcion}>
                Colocar carton dentro de la bolsa
              </Text> */}
            </View>

            
        
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>3</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Colocar brillos</Text>
                    <Text style={styles.pasoDescripcion}>Colocar brillos en la bengala</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_4.png")} style={styles.imagen}/>
              </View>

              {/* <Text style={styles.pasoDescripcion}>
                Colocar carton dentro de la bolsa
              </Text> */}
            </View>
            <View style={styles.pasoItem}>
              <View style={styles.pasoHeader}>
                <View style={styles.pasosContenedor2}>
                  <Text style={styles.pasoNumero}>4</Text>
                  <View>
                    <Text style={styles.pasoTitulo}>Agarrar bengala</Text>
                    <Text style={styles.pasoDescripcion}>Colocar bengala dentro de la bolsa</Text>
                  </View>
                </View>
                <Image source={require("../assets/paso_3.png")} style={styles.imagen}/>
              </View>

              {/* <Text style={styles.pasoDescripcion}>
                Colocar carton dentro de la bolsa
              </Text> */}
            </View>
        </View>
      </View>
    {/* Contadorr  */}
   
              
           
    <View style={styles.seccion}>   
      <Text style={styles.tituloSeccion}>Insumos</Text>
      <View style={styles.infoBox}>
      <Text style={styles.infoText}>Selecciona los insumos que vas a utilizar en esta producción</Text>
      <Text style={styles.contadorSeleccionados}>
        {productosSeleccionadosCount} de {productos.length-1} insumos seleccionados
      </Text>
      </View>

        <Text style={styles.tituloSeccion}>Seleccionar Cantidad</Text>

        {/**todo esto de abajo es una funcion que crea una "cajita" cada vez que recorre el array de productos. Se ve muy extenso, pero es medianamente simple. crea cada partesita de la parte de las cajas de conteo de productos, para cada producto*/}
          {productos.slice(0, 4).map((producto) => (//al poner una variable o funcion entre {} dentro de una etiqueta de react, indicamos que debe mostrar esa variable o funcion en el front
          //utilizamos el metodo slice para usar solo los primeros cuatro elementos de productos, y la funcion map para poder recorrer el array. (Me parece que aca no necesitamos usar la funcion map para actualizar el array, podriamos usar foreach)
          <View key={producto.id} style={[ styles.productoContainer, producto.seleccionado && styles.productoSeleccionado ]}>
            {/*con el atributo key*/}
            <View style={styles.leftGroup}>
              <TouchableOpacity style={[styles.productoCheckbox, producto.seleccionado && styles.productoCheckboxSeleccionado]}
                  onPress={() => toggleSeleccion(producto.id)}>{/**toggleSeleccion es la funcion (creada por nosotros) que cambia el estado de seleccionado del producto cuando se lo presiona(onPress={()=>toggleSeleccion===si esta presionado, cambia el estado)*/}
                  {producto.seleccionado && <Text style={styles.checkmark}> ✓ </Text>}  
              </TouchableOpacity>
              {producto.colores ? (
                <View style={styles.colorSelectorContainer}>
                  {/* Imagen del color seleccionado */}
                  <TouchableOpacity
                    onPress={() => setColorMenuAbierto(!colorMenuAbierto)}
                    style={styles.colorSelector}
                  >
                    <Image
                      source={producto.colores[producto.colorIndex]}
                      style={styles.img1}
                    />
                    <View style={styles.flechaContainer}>
                    <Text style={styles.flechaColor}>
                      {colorMenuAbierto ? '▲' : '▼'}
                    </Text>
                    </View>
                  </TouchableOpacity>

                  {/* Menú desplegable */}
                  {colorMenuAbierto && (
                    <View style={styles.menuColores}>
                      {producto.colores.map((color, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.opcionColor,
                            producto.colorIndex === index && styles.opcionColorSeleccionada
                          ]}
                          onPress={() => {
                            setProductos(prev =>
                              prev.map(pro =>
                                pro.id === producto.id
                                  ? { ...pro, colorIndex: index }
                                  : pro
                              )
                            );

                            setColorMenuAbierto(false);
                          }}
                        >
                          <Image
                            source={color}
                            style={styles.imagenOpcionColor}
                          />

                          <Text style={styles.textoOpcionColor}>
                    {['Azul', 'Rojo', 'Rosa', 'Violeta'][index]}
                </Text>


                          {producto.colorIndex === index && (
                            <Text style={styles.checkColor}>✓</Text>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ) : (
                <Image
                  source={producto.imagen}
                  style={styles.img1}
                />
              )}
            </View>
            <View style={styles.rightGroup}>
              <View style={styles.counterBox}>   
                <View style={styles.contadorContainer}>
                  {/**esto es un boton que llama a la funcion disminuir cantidad, con una etiqeuta de texto dentro, que simplemente es un signo menos */}
                    <TouchableOpacity style={styles.botonContador} onPress={() => disminuirCantidad(producto.id)}>
                      <Text style={styles.textoBotonContador}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.cantidad}>
                      {/**una etiqueta de texto que simplemente muestra la propiedad "cantidad" del producto */}
                      {producto.cantidad} 
                    </Text>
                    
                    <TouchableOpacity style={styles.botonContador} onPress={() => aumentarCantidad(producto.id)}>
                      {/**esto es un boton que llama a la funcion aumentar cantidad, con una etiqeuta de texto dentro, que simplemente es un signo mas */}
                      <Text style={styles.textoBotonContador}>+</Text>
                    </TouchableOpacity>
                
                  </View>
                </View>
            </View>
          </View>
          ))}
           
          <View style={styles.notaContainer}>
            <Text style={styles.notaText}>
              💡 Solo los insumos seleccionados se registrarán en el sistema de producción
            </Text>
          </View>
          <View>
          <Text style={styles.tituloSeccion}>Seleccionar cantidad de bengalas</Text>
          </View>
          
          {productos.slice(-1).map((producto) => (
          <View key={producto.id} style={[ styles.productoContainer, producto.seleccionado && styles.productoSeleccionado ]}>
            <View style={styles.leftGroup}>
              <TouchableOpacity style={[styles.productoCheckbox, producto.seleccionado && styles.productoCheckboxSeleccionado]}
                  onPress={() => toggleSeleccion(producto.id)}>
                  {producto.seleccionado && <Text style={styles.checkmark}> ✓ </Text>}  
              </TouchableOpacity>
                <Image source={producto.imagen} style={styles.img1}/>
            </View>
            <View style={styles.rightGroup}>
              <View style={styles.counterBox}>   
                <View style={styles.contadorContainer}>
                    <TouchableOpacity style={styles.botonContador}
                      onPress={() => disminuirCantidad(producto.id)}>
                      <Text style={styles.textoBotonContador}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.cantidad}>
                      {producto.cantidad} 
                    </Text>
                    <TouchableOpacity style={styles.botonContador}
                      onPress={() => aumentarCantidad(producto.id)}>
                      <Text style={styles.textoBotonContador}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </View>
          ))}
    </View>

    </ScrollView>
      {/* FOOTER */}  
        <View style={[styles.footer,{
          paddingBottom: insets.bottom,
          height: 65 + insets.bottom,
        },]}>
          <TouchableOpacity style={styles.botonFooter} 
            onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotonFooter}>← Volver</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[
              styles.botonFooter, 
              styles.botonConfirmar, 
              productosSeleccionadosCount === 0 && styles.botonDeshabilitado
            ]}
            onPress={()=>{
              igualarArray();
              generarComprobante();
            }}
            disabled={productosSeleccionadosCount === 1}>
            <Text style={styles.textoBotonFooter}>
              Continuar →
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
    // justifyContent: 'flex-end'
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
    flex: 1,
    justifyContent: 'center'
  },

  pasoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between'
  },

  pasosContenedor2:{
    flexDirection: 'row',
    width: '60%'
  },
  pasoTituloInstruccion:{
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
    // marginLeft: 42,
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
    backgroundColor: "#515050",
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
    marginBottom: 10,
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
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  botonFooter: {
    backgroundColor: '#5D4037', 
    // paddingVertical: 12, 
    paddingHorizontal: 20,
    borderRadius: 8, 
    alignItems: 'center', 
    justifyContent: 'center',
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
  colorSelector: {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
},

flechaColor: {
  fontSize: 18,
  color: '#5D4037',
  marginLeft: -75,
  backgroundColor: 'white',
  padding: 5,
  borderRadius: 10,
},

menuColores: {
  position: 'absolute',
  bottom: 70,
  left: 0,
  width: 180,
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 8,
  zIndex: 1000,
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 5,
},

opcionColor: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  borderRadius: 8,
  marginBottom: 4,
},

opcionColorSeleccionada: {
  backgroundColor: '#F3E5F5',
  borderWidth: 1,
  borderColor: '#5D4037',
},

imagenOpcionColor: {
  width: 45,
  height: 45,
  borderRadius: 8,
  marginRight: 10,
},

textoOpcionColor: {
  fontSize: 14,
  color: '#5D4037',
  fontWeight: 'bold',
  flex: 1,
},

checkColor: {
  color: '#4CAF50',
  fontSize: 20,
  fontWeight: 'bold',
},
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
