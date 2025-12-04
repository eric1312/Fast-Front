// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    setMensaje("");

    const resultado = login(nombre.trim(), password.trim());

    if (!resultado.ok) {
      setMensaje(resultado.mensaje || "Error al iniciar sesión.");
      return;
    }

    // Redirección según rol
    if (resultado.rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form">
          <h2>Iniciar sesión</h2>
          <p>Para probar: admin / 1234 (admin) o cliente / (cliente).</p>

          <form onSubmit={manejarSubmit}>
            <label>
              Usuario
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: admin"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ej: 1234"
              />
            </label>

            {mensaje && (
              <p style={{ color: "crimson", fontSize: ".9rem" }}>{mensaje}</p>
            )}

            <button type="submit" className="general-button-nad">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
