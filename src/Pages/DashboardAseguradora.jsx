import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardAseguradora = () => {
  const { usuario, logout, esAseguradora } = useAuthContext();
  const navigate = useNavigate();

  const [motos, setMotos] = useState([
    {
      id: 1,
      placa: "ABC-123",
      driver: "Juan Pérez",
      estadoDocumentos: "Completo",
      vencimiento: "2025-06-30",
    },
    {
      id: 2,
      placa: "XYZ-789",
      driver: "Carlos López",
      estadoDocumentos: "Incompleto",
      vencimiento: "2025-03-15",
    },
    {
      id: 3,
      placa: "DEF-456",
      driver: "María García",
      estadoDocumentos: "Por renovar",
      vencimiento: "2025-01-20",
    },
  ]);

  if (!esAseguradora) {
    return (
      <div className="dashboard-container">
        <h2>Acceso denegado</h2>
        <p>Solo aseguradora pueden acceder a este panel.</p>
        <button onClick={() => navigate("/login")}>Ir a Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📋 Panel de Aseguradora</h1>
        <p>Bienvenido, {usuario?.nombre}</p>
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dashboard-content">
        {/* Resumen */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>🏍️ Total de Motos</h3>
            <p className="stat-number">{motos.length}</p>
          </div>
          <div className="stat-card">
            <h3>✅ Documentos Completos</h3>
            <p className="stat-number">1</p>
          </div>
          <div className="stat-card">
            <h3>⚠️ Por Renovar</h3>
            <p className="stat-number">2</p>
          </div>
        </section>

        {/* Gestión de Documentos */}
        <section className="dashboard-section">
          <h2>🏍️ Control de Motos y Documentación</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Repartidor</th>
                <th>Estado Documentos</th>
                <th>Vencimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {motos.map((moto) => (
                <tr key={moto.id}>
                  <td>
                    <strong>{moto.placa}</strong>
                  </td>
                  <td>{moto.driver}</td>
                  <td>
                    <span
                      className={`badge badge-${moto.estadoDocumentos
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {moto.estadoDocumentos}
                    </span>
                  </td>
                  <td>{moto.vencimiento}</td>
                  <td>
                    <button className="btn-small">Ver Documentos</button>
                    <button className="btn-small btn-warning">
                      Solicitar Renovación
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Documentos Requeridos */}
        <section className="dashboard-section">
          <h2>📄 Documentos Requeridos por Moto</h2>
          <div className="docs-list">
            <div className="doc-item">
              <h3>Registro de Propiedad</h3>
              <p>Documento oficial que acredita la propiedad del vehículo</p>
              <button className="btn-small">Subir</button>
            </div>
            <div className="doc-item">
              <h3>Seguro de Responsabilidad Civil</h3>
              <p>Póliza vigente de seguro obligatorio</p>
              <button className="btn-small">Subir</button>
            </div>
            <div className="doc-item">
              <h3>Inspección Técnica</h3>
              <p>Revisión técnica del vehículo actualizada</p>
              <button className="btn-small">Subir</button>
            </div>
            <div className="doc-item">
              <h3>Licencia del Conductor</h3>
              <p>Licencia de conducir vigente del repartidor</p>
              <button className="btn-small">Subir</button>
            </div>
          </div>
        </section>

        {/* Alertas */}
        <section className="dashboard-section">
          <h2>⚠️ Alertas y Vencimientos</h2>
          <div className="alerts-list">
            <div className="alert alert-warning">
              <strong>Atención:</strong> La moto XYZ-789 tiene documentos incompletos.
              Requiere revisión inmediata.
            </div>
            <div className="alert alert-danger">
              <strong>Urgente:</strong> La moto DEF-456 vence el 20/01/2025.
              Solicitar renovación pronto.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardAseguradora;
