import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@registros_control';

// Guarda un nuevo registro de control
export const guardarRegistro = async (registro) => {
  try {
    const registrosActuales = await obtenerRegistros();

    const nuevoRegistro = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),//Date.now().getTime();
      ...registro,
    };

    const registrosActualizados = [nuevoRegistro, ...registrosActuales];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(registrosActualizados));

    return nuevoRegistro;
  } catch (error) {
    console.error('Error al guardar el registro:', error);
    throw error;
  }
};

// Devuelve todos los registros guardados (más reciente primero)
export const obtenerRegistros = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Borra todo el historial de registros
export const borrarRegistros = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al borrar los registros:', error);
  }
};