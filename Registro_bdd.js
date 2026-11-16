// Servicio de registros de control, conectado a Supabase.
// La tabla registros_control se relaciona con perfiles dos veces:
//   - operario_id:   quien hizo el conteo (el que eligió su nombre en el Login)
//   - supervisor_id: supervisor elegido por el operario

import { supabase } from './Supabase'; // ajustá la ruta según dónde lo tengas

const TABLA = 'registros_control';

// Con dos relaciones a "perfiles" hay que indicar cuál usar (alias!columna)
const SELECT_REGISTRO =
  '*, operario:perfiles!operario_id(nombre), supervisor:perfiles!supervisor_id(nombre)';

// Convierte una fila de Supabase al formato que usa la app
const mapearRegistro = (fila) => {
  const [anio, mes, dia] = fila.fecha.split('-');
  return {
    id: fila.id,
    tipoProduccion: fila.tipo_produccion,
    totalInsumosHechos: fila.cantidad,
    totalInsumosUsados: fila.insumos_usados,
    fallaFinal: fila.falla,
    operarioId: fila.operario_id,
    operarioFinal: fila.operario?.nombre ?? 'Sin operario',
    supervisorId: fila.supervisor_id,
    supervisorFinal: fila.supervisor?.nombre ?? 'Sin supervisor',
    fecha: `${dia}/${mes}/${anio}`,
    hora: fila.hora.slice(0, 5), // HH:MM
  };
};

// NUEVO: devuelve los perfiles de un rol ('operario' o 'supervisor')
export const obtenerPerfilesPorRol = async (rol) => {
  try {
    const { data, error } = await supabase
      .from('perfiles')
      .select('id, nombre')
      .eq('rol', rol)
      .order('nombre', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error al obtener los perfiles (${rol}):`, error);
    return [];
  }
};

// Devuelve los supervisores disponibles para que el operario elija uno
export const obtenerSupervisores = () => obtenerPerfilesPorRol('supervisor');

// Guarda un nuevo registro de control.
// registro.operarioId   -> id del operario que hizo el conteo (obligatorio)
// registro.supervisorId -> id del supervisor elegido (obligatorio)
// fecha y hora se completan solas en la base de datos.
export const guardarRegistro = async (registro) => {
  try {
    if (!registro.operarioId) {
      throw new Error('Falta el operario que hizo el conteo');
    }
    if (!registro.supervisorId) {
      throw new Error('Falta el supervisor que eligió el operario');
    }

    const { data, error } = await supabase
      .from(TABLA)
      .insert({
        tipo_produccion: registro.tipoProduccion,
        cantidad: registro.totalInsumosHechos,
        insumos_usados: registro.totalInsumosUsados,
        falla: registro.fallaFinal,
        operario_id: registro.operarioId,
        supervisor_id: registro.supervisorId,
      })
      .select(SELECT_REGISTRO)
      .single();

    if (error) throw error;
    return mapearRegistro(data);
  } catch (error) {
    console.error('Error al guardar el registro:', error);
    throw error;
  }
};

// Devuelve los registros guardados (más reciente primero).
// Si se pasa operarioId, solo devuelve los conteos de ese operario.
// Sin operarioId devuelve todos (por si otra pantalla lo necesita).
export const obtenerRegistros = async (operarioId) => {
  try {
    let consulta = supabase
      .from(TABLA)
      .select(SELECT_REGISTRO)
      .order('created_at', { ascending: false });

    if (operarioId) {
      consulta = consulta.eq('operario_id', operarioId);
    }

    const { data, error } = await consulta;

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