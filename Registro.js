// Servicio de registros de control, conectado a Supabase.
// Reemplaza la versión anterior que guardaba en AsyncStorage.

import { supabase } from './Supabase'; // ajustá la ruta según dónde lo tengas

const TABLA = 'registros_control';

// Convierte una fila de Supabase al formato que usaba la app:
// { id, fecha, hora, ...camposDelRegistro }
const mapearRegistro = (fila) => {
  const fechaObj = new Date(fila.created_at);
  return {
    ...fila.datos,
    id: fila.id,
    fecha: fechaObj.toLocaleDateString(),
    hora: fechaObj.toLocaleTimeString(),
  };
};

// Guarda un nuevo registro de control
export const guardarRegistro = async (registro) => {
  try {
    const { data, error } = await supabase
      .from(TABLA)
      .insert({ datos: registro })
      .select()
      .single();

    if (error) throw error;
    return mapearRegistro(data);
  } catch (error) {
    console.error('Error al guardar el registro:', error);
    throw error;
  }
};

// Devuelve todos los registros guardados (más reciente primero)
export const obtenerRegistros = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLA)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapearRegistro);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return [];
  }
};

// Borra todo el historial de registros
export const borrarRegistros = async () => {
  try {
    const { error } = await supabase
      .from(TABLA)
      .delete()
      .not('id', 'is', null); // Supabase exige un filtro en delete

    if (error) throw error;
  } catch (error) {
    console.error('Error al borrar los registros:', error);
  }
};