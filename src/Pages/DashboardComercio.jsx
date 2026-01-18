import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardComercio = () => {
  const { usuario, logout, esComercio } = useAuthContext();
  const navigate = useNavigate();

  if (!esComercio) {
    return (
      <div className="dashboard-container">
        <h2>Acceso denegado</h2>
        <p>Solo comercios pueden acceder a este panel.</p>
        <button onClick={() => navigate("/login")}>Ir a Login</button>
      </div>
    );
  }

  const productos = [
    { id: 1, nombre: "Producto 1", precio: 150, stock: 25 },
    { id: 2, nombre: "Producto 2", precio: 200, stock: 15 },
    { id: 3, nombre: "Producto 3", precio: 180, stock: 8 },
  ];

  const pedidos = [
    { id: 101, cliente: "Cliente 1", total: 350, estado: "Pendiente" },
    { id: 102, cliente: "Cliente 2", total: 200, estado: "Entregado" },
    { id: 103, cliente: "Cliente 3", total: 530, estado: "En camino" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📦 Panel de Comercio</h1>
        <p>Bienvenido, {usuario?.nombre}</p>
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dashboard-content">
        {/* Resumen rápido */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>📊 Total de Pedidos</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="stat-card">
            <h3>💰 Ingresos Hoy</h3>
            <p className="stat-number">$1,080</p>
          </div>
          <div className="stat-card">
            <h3>📦 Productos</h3>
            <p className="stat-number">3</p>
          </div>
        </section>

        {/* Productos */}
        <section className="dashboard-section">
          <h2>📋 Mis Productos</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button className="btn-small">Editar</button>
                    <button className="btn-small btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-primary">+ Agregar Producto</button>
        </section>

        {/* Pedidos */}
        <section className="dashboard-section">
          <h2>🛒 Pedidos Recibidos</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>${p.total}</td>
                  <td>
                    <span className={`badge badge-${p.estado.toLowerCase()}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default DashboardComercio;
