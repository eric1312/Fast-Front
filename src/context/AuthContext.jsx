// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Datos mock por rol (en producción, vendrían del backend)
const usuariosMock = {
  admin: {
    admin1: { password: "1234", rol: "admin", nombre: "Admin", id: 1 },
  },
  comercio: {
    comercio1: { password: "1234", rol: "comercio", nombre: "Comercio Fast", id: 2, comercioId: 1 },
  },
  delivery: {
    delivery1: { password: "1234", rol: "delivery", nombre: "Repartidor Juan", id: 3, deliveryId: 1, vehiculo: "Moto" },
  },
  usuario: {
    cliente1: { password: "1234", rol: "usuario", nombre: "Cliente", id: 4, email: "cliente@example.com" },
  },
  aseguradora: {
    aseguradora1: { password: "1234", rol: "aseguradora", nombre: "Asegurador", id: 5, aseguradoraId: 1 },
  },
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  const login = (nombre, password, rol) => {
    if (!nombre || !password || !rol) {
      return { ok: false, mensaje: "Completá usuario, contraseña y selecciona un rol." };
    }

    const usuariosDelRol = usuariosMock[rol] || {};
    const usuarioEncontrado = usuariosDelRol[nombre];

    if (!usuarioEncontrado || usuarioEncontrado.password !== password) {
      return { ok: false, mensaje: "Usuario o contraseña incorrectos para este rol." };
    }

    setUsuario(usuarioEncontrado);
    setRolSeleccionado(rol);

    return { ok: true, rol: usuarioEncontrado.rol };
  };

  const logout = () => {
    setUsuario(null);
    setRolSeleccionado(null);
  };

  const esAdmin = usuario?.rol === "admin";
  const esComercio = usuario?.rol === "comercio";
  const esDelivery = usuario?.rol === "delivery";
  const esUsuario = usuario?.rol === "usuario";
  const esAseguradora = usuario?.rol === "aseguradora";

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rolSeleccionado,
        esAdmin,
        esComercio,
        esDelivery,
        esUsuario,
        esAseguradora,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);