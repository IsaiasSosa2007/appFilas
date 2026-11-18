import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { obtenerRegistros } from "./Registro_bdd";
import { useUsuario } from "./UsuarioContext";
import { FONDO } from "./Componentes/Fondo";
import FooterBotones from "./Componentes/Navbar";

/* ---------- Helpers de fechas ---------- */

const MESES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];
const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];

const pad = (n) => String(n).padStart(2, "0");

// Clave interna de fecha: "AAAA-MM-DD" (mes de 1 a 12)
const armarClave = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`;

const claveHoy = () => {
  const n = new Date();
  return armarClave(n.getFullYear(), n.getMonth() + 1, n.getDate());
};

// "2026-11-16" -> "16/11/2026"
const formatearClave = (clave) => {
  const [y, m, d] = clave.split("-");
  return `${d}/${m}/${y}`;
};

// Convierte el texto de item.fecha ("16/11/2026", "16-11-2026" o "2026-11-16")
// a la clave interna "AAAA-MM-DD". Devuelve null si no se puede interpretar.
const parsearFecha = (texto) => {
  if (!texto) return null;
  const s = String(texto).trim();

  let match = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) return armarClave(+match[1], +match[2], +match[3]);

  match = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (match) {
    let y = +match[3];
    if (y < 100) y += 2000;
    return armarClave(y, +match[2], +match[1]);
  }
  return null;
};

/* ---------- Calendario ---------- */

function Calendario({ fechaSeleccionada, diasConRegistros, onSeleccionar }) {
  const [sy, sm] = fechaSeleccionada.split("-").map(Number);
  const [mes, setMes] = useState({ y: sy, m: sm });
  const hoy = claveHoy();

  const cambiarMes = (delta) => {
    setMes(({ y, m }) => {
      let nm = m + delta;
      let ny = y;
      if (nm < 1) {
        nm = 12;
        ny -= 1;
      } else if (nm > 12) {
        nm = 1;
        ny += 1;
      }
      return { y: ny, m: nm };
    });
  };

  // La semana arranca en lunes
  const primerDia = new Date(mes.y, mes.m - 1, 1).getDay(); // 0 = domingo
  const offset = (primerDia + 6) % 7;
  const diasEnMes = new Date(mes.y, mes.m, 0).getDate();

  const celdas = [];
  for (let i = 0; i < offset; i++) celdas.push(null);
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d);
  while (celdas.length % 7 !== 0) celdas.push(null);

  const semanas = [];
  for (let i = 0; i < celdas.length; i += 7) semanas.push(celdas.slice(i, i + 7));

  return (
    <View style={styles.calendario}>
      <View style={styles.calHeader}>
        <TouchableOpacity onPress={() => cambiarMes(-1)} style={styles.calFlecha}>
          <Text style={styles.calFlechaTexto}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.calTitulo}>
          {MESES[mes.m - 1]} {mes.y}
        </Text>
        <TouchableOpacity onPress={() => cambiarMes(1)} style={styles.calFlecha}>
          <Text style={styles.calFlechaTexto}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calFila}>
        {DIAS_SEMANA.map((d, i) => (
          <View key={i} style={styles.calCelda}>
            <Text style={styles.calDiaSemana}>{d}</Text>
          </View>
        ))}
      </View>

      {semanas.map((semana, i) => (
        <View key={i} style={styles.calFila}>
          {semana.map((dia, j) => {
            if (!dia) return <View key={j} style={styles.calCelda} />;

            const clave = armarClave(mes.y, mes.m, dia);
            const seleccionado = clave === fechaSeleccionada;
            const esHoy = clave === hoy;
            const tieneRegistros = diasConRegistros.has(clave);

            return (
              <TouchableOpacity
                key={j}
                style={styles.calCelda}
                onPress={() => onSeleccionar(clave)}
              >
                <View
                  style={[
                    styles.calDia,
                    esHoy && styles.calDiaHoy,
                    seleccionado && styles.calDiaSeleccionado,
                  ]}
                >
                  <Text
                    style={[
                      styles.calDiaTexto,
                      seleccionado && styles.calDiaTextoSeleccionado,
                    ]}
                  >
                    {dia}
                  </Text>
                </View>
                <View
                  style={[
                    styles.calPunto,
                    tieneRegistros && styles.calPuntoActivo,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

/* ---------- Pantalla ---------- */

export default function RegistroOperario({ navigation }) {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(claveHoy());
  const [calendarioVisible, setCalendarioVisible] = useState(false);
  const { usuario } = useUsuario();

  // Recarga los registros cada vez que se entra a la pantalla
  // y vuelve a mostrar el día de hoy
  useFocusEffect(
    useCallback(() => {
      let activo = true;
      setFechaSeleccionada(claveHoy());
      setCalendarioVisible(false);

      const cargarRegistros = async () => {
        // Sin usuario logueado no se muestra nada (evita mostrar conteos ajenos)
        if (!usuario?.id) {
          setRegistros([]);
          setCargando(false);
          return;
        }
        setCargando(true);
        const data = await obtenerRegistros(usuario.id);
        if (activo) {
          setRegistros(data);
          setCargando(false);
        }
      };
      cargarRegistros();
      return () => {
        activo = false;
      };
    }, [usuario?.id])
  );

  // Días que tienen al menos un registro (para marcarlos en el calendario)
  const diasConRegistros = useMemo(() => {
    const set = new Set();
    registros.forEach((r) => {
      const clave = parsearFecha(r.fecha);
      if (clave) set.add(clave);
    });
    return set;
  }, [registros]);

  // Registros del día seleccionado
  const registrosDelDia = useMemo(
    () => registros.filter((r) => parsearFecha(r.fecha) === fechaSeleccionada),
    [registros, fechaSeleccionada]
  );

  const esHoy = fechaSeleccionada === claveHoy();

  const seleccionarFecha = (clave) => {
    setFechaSeleccionada(clave);
    setCalendarioVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTipo}>{item.tipoProduccion}</Text>
        <Text style={styles.cardFechaHora} numberOfLines={1} adjustsFontSizeToFit>
          {item.fecha} - {item.hora}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTexto}>TOTAL DE INSUMOS UTILIZADOS: {item.totalInsumosUsados} </Text>
        <Text style={styles.cardTexto}>CANTIDAD DE PRODUCTO FINAL: {item.totalInsumosHechos} </Text>
        <Text style={styles.cardTexto}>FALLA: {item.fallaFinal} </Text>
        <Text style={styles.cardTexto}>SUPERVISOR/A: {item.supervisorFinal} </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contenido}>
      <Text style={styles.texto}>REGISTRO DE CONTROLES</Text>

      {/* Selector de fecha */}
      <View style={styles.filtros}>
        <TouchableOpacity
          style={styles.botonFecha}
          onPress={() => setCalendarioVisible((v) => !v)}
        >
          <Text style={styles.textoBotonFecha}>
            {esHoy ? "HOY" : formatearClave(fechaSeleccionada)} {calendarioVisible ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {!esHoy && (
          <TouchableOpacity
            style={styles.botonHoy}
            onPress={() => seleccionarFecha(claveHoy())}
          >
            <Text style={styles.textoBotonHoy}>VOLVER A HOY</Text>
          </TouchableOpacity>
        )}
      </View>

      {calendarioVisible && (
        <Calendario
          fechaSeleccionada={fechaSeleccionada}
          diasConRegistros={diasConRegistros}
          onSeleccionar={seleccionarFecha}
        />
      )}

      <Text style={styles.subtitulo}>
        {esHoy ? "PRODUCCIÓN DE HOY" : `PRODUCCIÓN DEL ${formatearClave(fechaSeleccionada)}`}
        {" "}({registrosDelDia.length})
      </Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#1F4E79" style={{ marginTop: 40 }} />
      ) : registrosDelDia.length === 0 ? (
        <Text style={styles.vacio}>
          {esHoy
            ? "TODAVÍA NO HAY CONTROLES REGISTRADOS HOY."
            : "NO HAY CONTROLES REGISTRADOS EN ESTA FECHA."}
        </Text>
      ) : (
        <FlatList
          data={registrosDelDia}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
      </View>

      <StatusBar style="auto" />

      {/* FOOTER: solo el botón de volver */}
      <FooterBotones
        onVolver={() => navigation.goBack()}
        mostrarContinuar={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FONDO,
    paddingTop: 60,
  },
  contenido: {
    flex: 1,
  },
  texto: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F4E79",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F4E79",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  vacio: {
    textAlign: "center",
    color: "#1F4E79",
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 20,
  },

  /* Filtros de fecha */
  filtros: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  botonFecha: {
    backgroundColor: "#1F4E79",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  textoBotonFecha: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  botonHoy: {
    borderWidth: 1,
    borderColor: "#1F4E79",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  textoBotonHoy: {
    color: "#1F4E79",
    fontWeight: "bold",
    fontSize: 12,
  },

  /* Calendario */
  calendario: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
  },
  calHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  calFlecha: {
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  calFlechaTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F4E79",
  },
  calTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F4E79",
  },
  calFila: {
    flexDirection: "row",
  },
  calCelda: {
    width: "14.2857%",
    alignItems: "center",
    paddingVertical: 2,
  },
  calDiaSemana: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#888",
  },
  calDia: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  calDiaHoy: {
    borderWidth: 1,
    borderColor: "#1F4E79",
  },
  calDiaSeleccionado: {
    backgroundColor: "#1F4E79",
  },
  calDiaTexto: {
    fontSize: 14,
    color: "#333",
  },
  calDiaTextoSeleccionado: {
    color: "white",
    fontWeight: "bold",
  },
  calPunto: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 1,
    backgroundColor: "transparent",
  },
  calPuntoActivo: {
    backgroundColor: "#B71C1C",
  },

  /* Lista */
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 140, // espacio para que el último registro quede por encima del menú
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTipo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1F4E79",
  },
  cardFechaHora: {
    fontSize: 12,
    color: "#888",
  },
  cardBody: {
    gap: 2,
  },
  cardTexto: {
    fontSize: 14,
    color: "#333",
  },
});