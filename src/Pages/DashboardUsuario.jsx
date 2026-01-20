import { useAuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const DashboardUsuario = () => {
  const { usuario, logout, esUsuario } = useAuthContext();
  const navigate = useNavigate();
  /* Se saca el set de ordenes en la variable de const setOrdenes */
  const [ordenes] = useState([
    {
      id: 1001,
      fecha: "2025-01-08",
      estado: "Entregado",
      total: 350,
      items: 3,
    },
    {
      id: 1002,
      fecha: "2025-01-06",
      estado: "En camino",
      total: 200,
      items: 2,
    },
    {
      id: 1003,
      fecha: "2024-12-28",
      estado: "Entregado",
      total: 530,
      items: 5,
    },
  ]);

  if (!esUsuario) {
    return (
      <div className="dashboard-container">
        <h2>Acceso denegado</h2>
        <p>Solo usuarios pueden acceder a este panel.</p>
        <button onClick={() => navigate("/login")}>Ir a Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🛍️ Mi Cuenta</h1>
        <p>Bienvenido, {usuario?.nombre}</p>
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dashboard-content">
        {/* Acciones rápidas */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>🛒 Carrito</h3>
            <p className="stat-number">2</p>
            <Link to="/carrito" className="btn-small">
              Ver Carrito
            </Link>
          </div>
          <div className="stat-card">
            <h3>📦 Órdenes</h3>
            <p className="stat-number">{ordenes.length}</p>
          </div>
          <div className="stat-card">
            <h3>💰 Gasto Total</h3>
            <p className="stat-number">$1,080</p>
          </div>
        </section>

        {/* Mis Órdenes */}
        <section className="dashboard-section">
          <h2>📦 Mis Órdenes</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Número de Orden</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{orden.fecha}</td>
                  <td>{orden.items}</td>
                  <td>${orden.total}</td>
                  <td>
                    <span className={`badge badge-${orden.estado.toLowerCase()}`}>
                      {orden.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">Detalles</button>
                    <button className="btn-small">Seguimiento</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/" className="btn-primary">
            Continuar Comprando
          </Link>
        </section>

        {/* Información de Cuenta */}
        <section className="dashboard-section">
          <h2>👤 Información de Cuenta</h2>
          <div className="account-info">
            <div className="info-item">
              <label>Nombre:</label>
              <p>{usuario?.nombre}</p>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <p>{usuario?.email || "No especificado"}</p>
            </div>
            <div className="info-item">
              <label>Miembro desde:</label>
              <p>Enero 2025</p>
            </div>
            <button className="btn-primary">Editar Perfil</button>
          </div>
        </section>

        {/* Dirección de Envío */}
        <section className="dashboard-section">
          <h2>📍 Mis Direcciones</h2>
          <div className="addresses-list">
            <div className="address-card">
              <h4>Casa</h4>
              <p>Calle Principal 123, Apartamento 4B</p>
              <p>Ciudad, Estado 12345</p>
              <button className="btn-small">Editar</button>
              <button className="btn-small btn-danger">Eliminar</button>
            </div>
          </div>
          <button className="btn-primary">+ Agregar Dirección</button>
        </section>
      </div>
    </div>
  );
};

export default DashboardUsuario;
