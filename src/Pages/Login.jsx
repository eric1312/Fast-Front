// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");
  const [mensaje, setMensaje] = useState("");

  const rolesDisponibles = [
    { value: "usuario", label: "👤 Usuario (Comprador)" },
    { value: "comercio", label: "🏪 Comercio (Vendedor)" },
    { value: "delivery", label: "🚴 Delivery (Repartidor)" },
    { value: "aseguradora", label: "📋 Aseguradora" },
    { value: "admin", label: "⚙️ Administrador" },
  ];

  const credencialesDemo = {
    usuario: { usuario: "cliente1", password: "1234" },
    comercio: { usuario: "comercio1", password: "1234" },
    delivery: { usuario: "delivery1", password: "1234" },
    aseguradora: { usuario: "aseguradora1", password: "1234" },
    admin: { usuario: "admin1", password: "1234" },
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    const resultado = login(nombre.trim(), password.trim(), rol);

    if (!resultado.ok) {
      setMensaje(resultado.mensaje || "Error al iniciar sesión.");
      return;
    }

    // Redirección según rol
    const redirects = {
      admin: "/admin",
      comercio: "/dashboard-comercio",
      delivery: "/dashboard-delivery",
      usuario: "/dashboard-usuario",
      aseguradora: "/dashboard-aseguradora",
    };

    navigate(redirects[rol] || "/");
  };

  const rellenarDemo = () => {
    const demo = credencialesDemo[rol];
    setNombre(demo.usuario);
    setPassword(demo.password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form">
          <h2>Iniciar sesión</h2>

          {/* Selector de Rol */}
          <div className="role-selector">
            <label>Selecciona tu rol:</label>
            <div className="role-buttons">
              {rolesDisponibles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  className={`role-btn ${rol === r.value ? "active" : ""}`}
                  onClick={() => {
                    setRol(r.value);
                    setNombre("");
                    setPassword("");
                    setMensaje("");
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={manejarSubmit}>
            <label>
              Usuario
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </label>

            {mensaje && (
              <p style={{ color: "crimson", fontSize: ".9rem" }}>{mensaje}</p>
            )}

            <button type="submit" className="general-button-nad">
              Ingresar
            </button>

            <button
              type="button"
              className="demo-button-nad"
              onClick={rellenarDemo}
            >
              📋 Usar datos de demo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
