import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DashboardDelivery = () => {
  const { usuario, logout, esDelivery } = useAuthContext();
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState(null);
  /* Se saca el set de clientes en la variable de const setOrdenes */
  const [ordenes] = useState([
    { id: 1, cliente: "Cliente A", direccion: "Calle 1 #123", estado: "Asignado", monto: 150 },
    { id: 2, cliente: "Cliente B", direccion: "Calle 2 #456", estado: "Entregando", monto: 200 },
  ]);

  // Obtener geolocalizacion cada 1 minuto
  useEffect(() => {
    if (!esDelivery) return;

    const obtenerUbicacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUbicacion({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: new Date().toLocaleTimeString(),
            });
          },
          (error) => {
            console.log("Error al obtener ubicación:", error);
          }
        );
      }
    };

    // Obtener ubicación inmediatamente
    obtenerUbicacion();

    // Actualizar cada 60 segundos (1 minuto)
    const intervalo = setInterval(obtenerUbicacion, 60000);

    return () => clearInterval(intervalo);
  }, [esDelivery]);

  if (!esDelivery) {
    return (
      <div className="dashboard-container">
        <h2>Acceso denegado</h2>
        <p>Solo delivery pueden acceder a este panel.</p>
        <button onClick={() => navigate("/login")}>Ir a Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🚴 Panel de Delivery</h1>
        <p>Bienvenido, {usuario?.nombre}</p>
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dashboard-content">
        {/* Geolocalizacion */}
        <section className="dashboard-section">
          <h2>📍 Mi Ubicación en Tiempo Real</h2>
          {ubicacion ? (
            <div className="ubicacion-card">
              <p>
                <strong>Latitud:</strong> {ubicacion.lat.toFixed(4)}°
              </p>
              <p>
                <strong>Longitud:</strong> {ubicacion.lng.toFixed(4)}°
              </p>
              <p>
                <strong>Última actualización:</strong> {ubicacion.timestamp}
              </p>
              <p className="texto-pequeno">
                La ubicación se actualiza cada 1 minuto automáticamente.
              </p>
              <a
                href={`https://maps.google.com/?q=${ubicacion.lat},${ubicacion.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Ver en Google Maps
              </a>
            </div>
          ) : (
            <p>Obteniendo ubicación...</p>
          )}
        </section>

        {/* Órdenes activas */}
        <section className="dashboard-section">
          <h2>📦 Mis Órdenes</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{orden.cliente}</td>
                  <td>{orden.direccion}</td>
                  <td>
                    <span className={`badge badge-${orden.estado.toLowerCase()}`}>
                      {orden.estado}
                    </span>
                  </td>
                  <td>${orden.monto}</td>
                  <td>
                    <button className="btn-small">Detalles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Estadísticas */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>📊 Entregas Hoy</h3>
            <p className="stat-number">2</p>
          </div>
          <div className="stat-card">
            <h3>💰 Ganancia Hoy</h3>
            <p className="stat-number">$350</p>
          </div>
          <div className="stat-card">
            <h3>⭐ Calificación</h3>
            <p className="stat-number">4.8/5</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardDelivery;
