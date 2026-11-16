import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faVideo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import Header from "../Componentes/Header";
import { FONDO } from "../Componentes/Fondo";
import Botones from "../Componentes/Botones";

const { width: screenWidth } = Dimensions.get('window');

// MODALIDADES DE PRODUCCIÓN
const modalidades = {
  surtidos: {
    titulo: 'Globos surtidos',
    insumos: [
      'Bolsa replegable o transparente',
      'Solapa impresa',
      'Broches o precintos',
      'Set de globos (látex / surtidos)',
      'Código de barras individual',
      'Código de barras de caja',
      'Cinta de embalar',
    ],
    finales: [
      'Caja de 20 unidades',
      'Caja de 36 unidades',
    ],
  },

  accesorios: {
    titulo: 'Globos con accesorios',
    insumos: [
      'Set de globos con accesorios (cinta / infundible)',
      'Bolsa',
      'Solapa',
      'Caja contenedora',
      'Código de barras individual',
      'Código de barras de caja',
      'Cinta de embalar',
    ],
    finales: [
      'Caja de 3 tiras de 12 unidades c/u',
      'Caja de 36 unidades',
    ],
  },
};

// PASOS DEL TUTORIAL
// Los textos quedan como espacios para completar con las instrucciones reales.
const pasosTutorial = [
  {
    numero: '1',
    titulo: 'PASO 1',
    descripcion: 'Aquí se agregará la primera instrucción.',
  },
  {
    numero: '2',
    titulo: 'PASO 2',
    descripcion: 'Aquí se agregará la segunda instrucción.',
  },
  {
    numero: '3',
    titulo: 'PASO 3',
    descripcion: 'Aquí se agregará la tercera instrucción.',
  },
];

export default function ContGlobos({ navigation }) {
  const [modalidad, setModalidad] = useState(null);
  const [insumos, setInsumos] = useState([]);
  const [productoFinal, setProductoFinal] = useState(null);
  const [cantidadFinal, setCantidadFinal] = useState(0);

  // SELECCIONAR MODALIDAD
  const seleccionarModalidad = (clave) => {
    setModalidad(clave);
    setProductoFinal(null);
    setCantidadFinal(0);

    setInsumos(
      modalidades[clave].insumos.map((nombre, index) => ({
        id: index + 1,
        nombre,
        cantidad: 0,
        seleccionado: false,
      }))
    );
  };

  // CONTADOR DE INSUMOS
  const aumentarCantidad = (id) => {
    setInsumos((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setInsumos((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 0
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // SELECCIONAR INSUMOS
  const toggleSeleccion = (id) => {
    setInsumos((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, seleccionado: !item.seleccionado }
          : item
      )
    );
  };

  const insumosSeleccionados = insumos.filter(
    (item) => item.seleccionado
  );

  const puedeContinuar =
    modalidad !== null &&
    insumos.length > 0 &&
    insumos.every(
      (item) => item.seleccionado && item.cantidad > 0
    ) &&
    productoFinal !== null &&
    cantidadFinal > 0;

  // CAMBIAR MODALIDAD
  const cambiarModalidad = () => {
    setModalidad(null);
    setInsumos([]);
    setProductoFinal(null);
    setCantidadFinal(0);
  };

  // CONTINUAR A FALLAS
  const continuar = () => {
    // if (!modalidad) {
    //   Alert.alert('Atención', 'Seleccioná una modalidad.');
    //   return;
    // }

    // if (insumos.some((item) => !item.seleccionado)) {
    //   Alert.alert('Atención', 'Seleccioná todos los insumos.');
    //   return;
    // }

    // if (insumos.some((item) => item.cantidad <= 0)) {
    //   Alert.alert(
    //     'Atención',
    //     'Ingresá una cantidad mayor a cero para todos los insumos.'
    //   );
    //   return;
    // }

    // if (!productoFinal || cantidadFinal <= 0) {
    //   Alert.alert(
    //     'Atención',
    //     'Seleccioná un producto final e ingresá su cantidad.'
    //   );
    //   return;
    // }

    const nombreModalidad = modalidades[modalidad].titulo;

    navigation.navigate('Fallas', {
      productos: `Globos - ${nombreModalidad} - ${productoFinal}`,
      productosSeleccionados: insumosSeleccionados,
      totalProduccion: cantidadFinal,
    });
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.contenido}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenidoInterior}
      >

        {/* ENCABEZADO */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.tituloPrincipal}>
              ARMADO DE GLOBOS
            </Text>

            <Text style={styles.subtituloPrincipal}>
              Registro de producción
            </Text>
          </View>
        </View>

        {/* INSUMOS GENERALES */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>INSUMOS:</Text>

          <Text style={styles.texto}>
            • Bolsa
          </Text>
          <Text style={styles.texto}>
            • Solapa
          </Text>
          <Text style={styles.texto}>
            • Set de globos
          </Text>
          <Text style={styles.texto}>
            • Códigos de barras
          </Text>
          <Text style={styles.texto}>
            • Cinta de embalar
          </Text>
        </View>

        {/* VIDEO TUTORIAL */}
        <View style={styles.seccion}>
          <View style={styles.tituloConIcono}>
            <FontAwesomeIcon
              icon={faVideo}
              size={28}
              color="#000000"
            />
            <Text style={styles.tituloSinMargen}>
              VIDEO TUTORIAL
            </Text>
          </View>

          <View style={styles.videoContainer}>
            <View style={styles.videoPlaceholder}>
              <Text style={styles.iconoVideo}>▶</Text>

              <Text style={styles.textoVideoPrincipal}>
                PRÓXIMAMENTE
              </Text>

              <Text style={styles.textoVideoSecundario}>
                Aquí se podrá agregar un video para aprender
                cómo preparar los globos.
              </Text>
            </View>
          </View>
        </View>

        {/* PASO A PASO */}
        <View style={styles.seccion}>
          <View style={styles.tituloConIcono}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size={28}
              color="#000000"
            />
            <Text style={styles.tituloSinMargen}>
              PASO A PASO
            </Text>
          </View>

          <View style={styles.pasosContainer}>
            {pasosTutorial.map((paso) => (
              <View key={paso.numero} style={styles.pasoItem}>
                <View style={styles.pasoHeader}>
                  <View style={styles.pasosContenedor2}>
                    <Text style={styles.pasoNumero}>
                      {paso.numero}
                    </Text>

                    <View style={styles.pasoTextoContainer}>
                      <Text style={styles.pasoTitulo}>
                        {paso.titulo}
                      </Text>

                      <Text style={styles.pasoDescripcion}>
                        {paso.descripcion}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.imagenPlaceholder}>
                  <Text style={styles.iconoImagen}>📷</Text>

                  <Text style={styles.textoImagenPlaceholder}>
                    IMAGEN DEL PASO {paso.numero}
                  </Text>

                  <Text style={styles.textoImagenSecundario}>
                    Espacio reservado para agregar una foto
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* SELECCIÓN DE MODALIDAD */}
        {!modalidad ? (
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>
              SELECCIONÁ LA MODALIDAD
            </Text>

            <TouchableOpacity
              style={styles.botonModalidad}
              onPress={() => seleccionarModalidad('surtidos')}
              activeOpacity={0.8}
            >
              <Text style={styles.textoModalidad}>
                GLOBOS SURTIDOS
              </Text>

              <Text style={styles.descripcionModalidad}>
                Producción de globos surtidos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botonModalidad}
              onPress={() => seleccionarModalidad('accesorios')}
              activeOpacity={0.8}
            >
              <Text style={styles.textoModalidad}>
                GLOBOS CON ACCESORIOS
              </Text>

              <Text style={styles.descripcionModalidad}>
                Producción de globos con accesorios
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* MODALIDAD ELEGIDA */}
            <View style={styles.seccion}>
              <Text style={styles.tituloSeccion}>
                {modalidades[modalidad].titulo.toUpperCase()}
              </Text>

              <TouchableOpacity
                style={styles.botonCambiar}
                onPress={cambiarModalidad}
              >
                <Text style={styles.textoCambiar}>
                  CAMBIAR MODALIDAD
                </Text>
              </TouchableOpacity>
            </View>

            {/* CONTADOR DE INSUMOS */}
            <View style={styles.seccion}>
              <Text style={styles.tituloSeccion}>
                INSUMOS
              </Text>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  SELECCIONÁ LOS INSUMOS QUE VAS A UTILIZAR EN ESTA PRODUCCIÓN
                </Text>

                <Text style={styles.contadorSeleccionados}>
                  {insumosSeleccionados.length} DE {insumos.length} INSUMOS SELECCIONADOS
                </Text>
              </View>

              <Text style={styles.tituloSeccion}>
                SELECCIONAR CANTIDAD
              </Text>

              {insumos.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.productoContainer,
                    item.seleccionado && styles.productoSeleccionado,
                  ]}
                >
                  <View style={styles.grupoIzquierdo}>
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        item.seleccionado && styles.checkboxActivo,
                      ]}
                      onPress={() => toggleSeleccion(item.id)}
                    >
                      {item.seleccionado && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>

                    <Text style={styles.nombreProducto}>
                      {item.nombre}
                    </Text>
                  </View>

                  <View style={styles.contadorContainer}>
                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() => disminuirCantidad(item.id)}
                    >
                      <Text style={styles.textoBoton}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.cantidad}>
                      {item.cantidad}
                    </Text>

                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() => aumentarCantidad(item.id)}
                    >
                      <Text style={styles.textoBoton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* PRODUCTO FINAL */}
            <View style={styles.seccion}>
              <Text style={styles.tituloSeccion}>
                PRODUCTO FINAL
              </Text>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  SELECCIONÁ EL TIPO DE CAJA QUE VAS A PRODUCIR.
                </Text>
              </View>

              {modalidades[modalidad].finales.map((final) => (
                <TouchableOpacity
                  key={final}
                  style={[
                    styles.opcionFinal,
                    productoFinal === final && styles.opcionFinalActiva,
                  ]}
                  onPress={() => {
                    setProductoFinal(final);
                    setCantidadFinal(0);
                  }}
                >
                  <View
                    style={[
                      styles.radio,
                      productoFinal === final && styles.radioActivo,
                    ]}
                  >
                    {productoFinal === final && (
                      <View style={styles.radioCentro} />
                    )}
                  </View>

                  <Text style={styles.textoFinal}>
                    {final}
                  </Text>
                </TouchableOpacity>
              ))}

              {productoFinal && (
                <View style={styles.cantidadFinalContainer}>
                  <Text style={styles.tituloCantidadFinal}>
                    CANTIDAD DE {productoFinal.toUpperCase()}
                  </Text>

                  <View style={styles.contadorContainer}>
                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() =>
                        setCantidadFinal((prev) =>
                          Math.max(0, prev - 1)
                        )
                      }
                    >
                      <Text style={styles.textoBoton}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.cantidad}>
                      {cantidadFinal}
                    </Text>

                    <TouchableOpacity
                      style={styles.botonContador}
                      onPress={() =>
                        setCantidadFinal((prev) => prev + 1)
                      }
                    >
                      <Text style={styles.textoBoton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* AVISO */}
      {modalidad && !puedeContinuar && (
        <Text style={styles.aviso}>
          Completá todos los insumos y el producto final para continuar.
        </Text>
      )}

      {/* BOTONES INFERIORES */}
      <Botones
        onVolver={() => navigation.goBack()}
        onContinuar={continuar}
        
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
    paddingHorizontal: 20,
  },

  contenidoInterior: {
    paddingTop: 10,
    paddingBottom: 25,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: screenWidth - 40,
    elevation: 8,
  },

  tituloPrincipal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },

  subtituloPrincipal: {
    fontSize: 17,
    color: '#444444',
    marginTop: 8,
  },

  seccion: {
    marginBottom: 25,
  },

  tituloSeccion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4E79',
    textAlign: 'center',
    marginBottom: 15,
  },

  texto: {
    fontSize: 17,
    color: '#222222',
    marginBottom: 8,
  },

  tituloConIcono: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 12,
  },

  tituloSinMargen: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4E79',
  },

  videoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },

  videoPlaceholder: {
    height: 190,
    backgroundColor: '#EAF2F8',
    borderWidth: 2,
    borderColor: '#8AAAC5',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },

  iconoVideo: {
    fontSize: 45,
    color: '#1F4E79',
    marginBottom: 10,
  },

  textoVideoPrincipal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4E79',
    marginBottom: 8,
  },

  textoVideoSecundario: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 23,
  },

  pasosContainer: {
    marginTop: 5,
  },

  pasoItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#D6E4F0',
    elevation: 3,
  },

  pasoHeader: {
    marginBottom: 15,
  },

  pasosContenedor2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pasoNumero: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: '#1F4E79',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
    overflow: 'hidden',
  },

  pasoTextoContainer: {
    flex: 1,
  },

  pasoTitulo: {
    color: '#1F4E79',
    fontSize: 18,
    fontWeight: 'bold',
  },

  pasoDescripcion: {
    fontSize: 15,
    color: '#222222',
    lineHeight: 22,
    marginTop: 5,
  },

  imagenPlaceholder: {
    width: '100%',
    height: 175,
    backgroundColor: '#F0F4F8',
    borderWidth: 2,
    borderColor: '#8AAAC5',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconoImagen: {
    fontSize: 38,
    marginBottom: 8,
  },

  textoImagenPlaceholder: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1F4E79',
    textAlign: 'center',
  },

  textoImagenSecundario: {
    fontSize: 14,
    color: '#444444',
    marginTop: 5,
    textAlign: 'center',
  },

  botonModalidad: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#1F4E79',
  },

  textoModalidad: {
    color: '#1F4E79',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  descripcionModalidad: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },

  botonCambiar: {
    backgroundColor: '#1F4E79',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoCambiar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },

  infoText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 23,
  },

  contadorSeleccionados: {
    textAlign: 'center',
    color: '#1F4E79',
    fontWeight: 'bold',
    fontSize: 15,
  },

  productoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  productoSeleccionado: {
    backgroundColor: '#EAF2F8',
    borderColor: '#1F4E79',
    borderWidth: 2,
  },

  grupoIzquierdo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
   

  }
})
