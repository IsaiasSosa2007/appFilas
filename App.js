import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { use, useState } from "react";

///cambios mios probar arreglo
import PerfilAD from "./AdminScrenns/PerfilAD";
import CambiarModo from "./CambiarModo";
////////////////////////////
import Navbar from "./Componentes/Navbar";
import Panel from "./Panel";
import RedAdmin from "./RedAdmin";
import RedUser from "./RedUser";
import CameraScreen from "./CameraScreen";

//Armado
import Productos from "./Armado/Productos";
import Cont from "./Armado/Cont";
import Fallas from "./Armado/Fallas";
import ComprobanteAR from "./Armado/ComprobanteAR";
import Supervisor from "./Armado/Supervisor";
//Encurtidos
import Dulces from "./Encurtidos/Dulces";
import FrutillaRecetas from "./Encurtidos/FrutillaRecetas";
import NaranjaRecetas from "./Encurtidos/NaranjaRecetas";
import TomateRecetas from "./Encurtidos/TomateRecetas";
import Jefe from "./Encurtidos/Jefe";
import ComprobanteEN from "./Encurtidos/ComprobanteEN";

//Panaderia
import Comidas from "./Panaderia/Comidas";
import ChipaReceta from "./Panaderia/ChipaReceta";
import PanReceta from "./Panaderia/PanReceta";
import PizzaReceta from "./Panaderia/PizzaReceta";
import JefePan from "./Panaderia/JefePan";
import ComprobantePA from "./Panaderia/CompobantePA";

//admin panaderia
import PanaderiaAD from "./AdminScrenns/PanaderiaAD";
import AgregarComida from "./AdminScrenns/AgregarComida";
//admin taller
import ArmadoAD from "./AdminScrenns/ArmadoAD";
import AgregarProducto from "./AdminScrenns/AgregarProducto";

//admin encurtidos
import EncurtidosAD from "./AdminScrenns/EncurtidosAD";
import AgregarEncurtidos from "./AdminScrenns/AgregarEncurtidos";

const Stack = createNativeStackNavigator();

const App = () => {
  const [comidas, setComidas] = useState([
    {
      id: 1,
      nombre: "Pizza",
      imagen: require("./assets/pizza.png"),
      agregada: true,
    },
    {
      id: 2,
      nombre: "Pan",
      imagen: require("./assets/pan.png"),
      agregada: true,
    },
    {
      id: 3,
      nombre: "Chipa",
      imagen: require("./assets/chipa.jpg"),
      agregada: true,
    },
  ]);

  const agregarComida = (id) => {
    setComidas((prev) =>
      prev.map((comida) =>
        comida.id === id ? { ...comida, agregada: true } : comida,
      ),
    );
  };

  const quitarComida = (id) => {
    setComidas((prev) =>
      prev.map((comida) =>
        comida.id === id ? { ...comida, agregada: false } : comida,
      ),
    );
  };

  const [mermeladas, setMermelada] = useState([
    {
      id: 1,
      nombre: "Frutilla",
      imagen: require("./assets/frutilla.jpg"),
      agregada: true,
    },
    {
      id: 2,
      nombre: "Naranja",
      imagen: require("./assets/naranja.jpg"),
      agregada: true,
    },
    {
      id: 3,
      nombre: "Tomate",
      imagen: require("./assets/tomate.png"),
      agregada: true,
    },
    {
      id: 4,
      nombre: "Alfajor",
      imagen: require("./assets/alfajores.png"),
      agregada: false,
    },
  ]);
  const agregarMermeladas = (id) => {
    setMermelada((prev) =>
      prev.map((mermelada) =>
        mermelada.id === id ? { ...mermelada, agregada: true } : mermelada,
      ),
    );
  };

  const quitarMermeladas = (id) => {
    setMermelada((prev) =>
      prev.map((mermelada) =>
        mermelada.id === id ? { ...mermelada, agregada: false } : mermelada,
      ),
    );
  };

  const [productos, setProductos] = useState([
    // {
    //   id: 1,
    //   nombre: "Tapas",
    //   imagen: require("./assets/Prd1.png"),
    //   agregado: true,
    // },
    {
      id: 2,
      nombre: "Bengalas",
      imagen: require("./assets/Prd2.png"),
      agregado: true,
    },
  ]);

  const agregarProducto = (id) => {
    setProductos((prev) =>
      prev.map((producto) =>
        producto.id === id ? { ...producto, agregado: true } : producto,
      ),
    );
  };

  const quitarProducto = (id) => {
    setProductos((prev) =>
      prev.map((producto) =>
        producto.id === id ? { ...producto, agregado: false } : producto,
      ),
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Panel"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Panel" component={Panel} />

        <Stack.Screen name="Comidas">
          {(props) => <Comidas {...props} comidas={comidas} />}
        </Stack.Screen>

        <Stack.Screen name="PanaderiaAD">
          {(props) => <PanaderiaAD {...props} comidas={comidas} />}
        </Stack.Screen>

        <Stack.Screen name="AgregarComida">
          {(props) => (
            <AgregarComida
              {...props}
              comidas={comidas}
              agregarComida={agregarComida}
              quitarComida={quitarComida}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Productos">
          {(props) => <Productos {...props} productos={productos} />}
        </Stack.Screen>
        <Stack.Screen name="ArmadoAD">
          {(props) => <ArmadoAD {...props} productos={productos} />}
        </Stack.Screen>
        <Stack.Screen name="AgregarProducto">
          {(props) => {
            <AgregarProducto
              {...props}
              productos={productos}
              agregarProducto={agregarProducto}
              quitarProducto={quitarProducto}
            />;
          }}
        </Stack.Screen>
        <Stack.Screen name="Dulces">{(props) => <Dulces {...props} mermeladas={mermeladas} />}</Stack.Screen>
        <Stack.Screen name="EncurtidosAD">{(props) => <EncurtidosAD {...props} mermeladas={mermeladas} />}</Stack.Screen>
        <Stack.Screen name="AgregarEncurtidos">
          {(props) => (
            <AgregarEncurtidos
              {...props}
              mermeladas={mermeladas}
              agregarMermeladas={agregarMermeladas}
              quitarMermeladas={quitarMermeladas}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CambiarModo" component={CambiarModo} />
        <Stack.Screen name="RedAdmin" component={RedAdmin} />
        <Stack.Screen name="RedUser" component={RedUser} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />

        <Stack.Screen name="Cont" component={Cont} />
        <Stack.Screen name="Fallas" component={Fallas} />
        <Stack.Screen name="ComprobanteAR" component={ComprobanteAR} />
        <Stack.Screen name="Supervisor" component={Supervisor} />

        <Stack.Screen name="FrutillaRecetas" component={FrutillaRecetas} />
        <Stack.Screen name="NaranjaRecetas" component={NaranjaRecetas} />
        <Stack.Screen name="TomateRecetas" component={TomateRecetas} />
        <Stack.Screen name="ComprobanteEN" component={ComprobanteEN} />
        <Stack.Screen name="Jefe" component={Jefe} />

        <Stack.Screen name="ChipaReceta" component={ChipaReceta} />
        <Stack.Screen name="PanReceta" component={PanReceta} />
        <Stack.Screen name="PizzaReceta" component={PizzaReceta} />
        <Stack.Screen name="ComprobantePA" component={ComprobantePA} />
        <Stack.Screen name="JefePan" component={JefePan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
