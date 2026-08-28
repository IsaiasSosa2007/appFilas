import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function CameraScreen({navigation}){
    return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require("./assets/Logo.png")} style={styles.logo}/>
            <Text style={styles.tituloHeader}>F. I. L. A.S.</Text> 
          </View>
          
          <Text style={styles.selection}>Sacar Foto</Text>
          <TouchableOpacity style={styles.bot} onPress={()=>( navigation.navigate("RedUser"))}>
          <FontAwesome name="camera" size={55} color="black" />  
          </TouchableOpacity>  
          <View style={{alignContent: 'space-between', justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={styles.bott}>
          <Text>Foto</Text>
          </View>

          <View style={styles.bott}>
          <Text>Foto</Text>
          </View>

          <View style={styles.bott}>
          <Text>Foto</Text>
          </View>

          </View>
              <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D98F0E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#5D4037',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    padding: 16,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    width: '100%',
    height: 140,
    bottom: '20%',
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
  bot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#5D4037',
    borderRadius: 3,
    bottom: 7,
  },
  bott:{
     justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#5D4037',
    borderRadius: 3,
    margin: 4,
    top: 80,
    

  },
   selection :{
    color: '#5D4037',
    justifyContent:"center",
    alignItems:"center",
    bottom: 200,
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 260,
    backgroundColor:'white',
    borderRadius: 10,
    width: 200,
    paddingLeft: 32,
    bottom: 121,
  
  },
 
});
