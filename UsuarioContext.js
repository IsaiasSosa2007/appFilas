import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "./Supabase";

const UsuarioContext = createContext(null);

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
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    // Restaura la sesión guardada (si existe)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user && activo) {
        const u = await construirUsuario(session.user);
        if (activo) setUsuario(u);
      }
      if (activo) setCargando(false);
    });

    // Escucha logins / logouts
    const { data: listener } = supabase.auth.onAuthStateChange(
      (evento, session) => {
        // setTimeout evita bloqueos al llamar a Supabase dentro del callback
        setTimeout(async () => {
          if (!activo) return;
          if (session?.user) {
            const u = await construirUsuario(session.user);
            if (activo) setUsuario(u);
          } else if (evento === "SIGNED_OUT") {
            setUsuario(null);
          }
        }, 0);
      }
    );

    return () => {
      activo = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const cerrarSesion = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    setUsuario(null);
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, cargando, cerrarSesion }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export const useUsuario = () => useContext(UsuarioContext);