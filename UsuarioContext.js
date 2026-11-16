import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./Supabase";

const UsuarioContext = createContext(null);

// Clave con la que se guarda la sesión en el teléfono
const CLAVE_USUARIO = "filas_usuario";

// Arma el objeto usuario con los datos de la tabla "perfiles"
const construirUsuario = async (user) => {
  const { data, error } = await supabase
    .from("perfiles")
    .select("nombre, rol")
    .eq("id", user.id)
    .maybeSingle();

  if (error) console.error("Error al cargar el perfil:", error);

  return {
    id: user.id,
    email: user.email,
    nombre: data?.nombre ?? user.email ?? "SIN NOMBRE",
    rol: data?.rol ?? "operario",
  };
};

export function UsuarioProvider({ children }) {
  const [usuario, setUsuarioState] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Guarda el usuario en memoria y también en el teléfono (para mantener la sesión).
  // Con null borra la sesión guardada.
  const guardarUsuario = useCallback(async (u) => {
    setUsuarioState(u);
    try {
      if (u) {
        await AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(u));
      } else {
        await AsyncStorage.removeItem(CLAVE_USUARIO);
      }
    } catch (error) {
      console.error("Error al guardar la sesión:", error);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    // Restaura la sesión guardada en el teléfono (si existe)
    (async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_USUARIO);
        if (guardado) {
          if (activo) setUsuarioState(JSON.parse(guardado));
        } else {
          // Por las dudas: si hubiera una sesión de Supabase Auth, se usa esa
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session?.user && activo) {
            const u = await construirUsuario(session.user);
            if (activo) await guardarUsuario(u);
          }
        }
      } catch (error) {
        console.error("Error al restaurar la sesión:", error);
      }
      if (activo) setCargando(false);
    })();

    // Escucha logins / logouts
    const { data: listener } = supabase.auth.onAuthStateChange(
      (evento, session) => {
        // setTimeout evita bloqueos al llamar a Supabase dentro del callback
        setTimeout(async () => {
          if (!activo) return;
          if (session?.user) {
            const u = await construirUsuario(session.user);
            if (activo) await guardarUsuario(u);
          } else if (evento === "SIGNED_OUT") {
            await guardarUsuario(null);
          }
        }, 0);
      }
    );

    return () => {
      activo = false;
      listener.subscription.unsubscribe();
    };
  }, [guardarUsuario]);

  const cerrarSesion = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    await guardarUsuario(null); // borra la sesión guardada
  }, [guardarUsuario]);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario: guardarUsuario, cargando, cerrarSesion }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export const useUsuario = () => useContext(UsuarioContext);