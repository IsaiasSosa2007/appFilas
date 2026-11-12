// Servicio de registros de control, conectado a Supabase.
// La tabla registros_control está relacionada con perfiles mediante supervisor_id.
 
import { supabase } from './Supabase'; // ajustá la ruta según dónde lo tengas
 
const TABLA = 'registros_control';
 
// Convierte una fila de Supabase al formato que usa la app
const mapearRegistro = (fila) => {
  const [anio, mes, dia] = fila.fecha.split('-');
  return {
    id: fila.id,
    tipoProduccion: fila.tipo_produccion,
    totalInsumosHechos: fila.cantidad,
    totalInsumosUsados: fila.insumos_usados,
    fallaFinal: fila.falla,
    supervisorFinal: fila.perfiles?.nombre ?? 'Sin supervisor',
    fecha: `${dia}/${mes}/${anio}`,
    hora: fila.hora.slice(0, 5), // HH:MM
  };
};
 
// Guarda un nuevo registro de control.
// supervisor_id, fecha y hora se completan solos en la base de datos.
export const guardarRegistro = async (registro) => {
  try {
    const { data, error } = await supabase
      .from(TABLA)
      .insert({
        tipo_produccion: registro.tipoProduccion,
        cantidad: registro.totalInsumosHechos,
        insumos_usados: registro.totalInsumosUsados,
        falla: registro.fallaFinal,
      })
      .select('*, perfiles(nombre)')
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
      .select('*, perfiles(nombre)')
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