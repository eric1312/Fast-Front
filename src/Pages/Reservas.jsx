// src/Pages/Reservas.jsx
import { useEffect, useState } from "react";
import Destacados from "./Destacados";
import { useAuthContext } from "../context/AuthContext";

const API_RESERVAS = "https://68def7d5898434f41356757f.mockapi.io/reservas";

const Reservas = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [comentario, setComentario] = useState("");

  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");


  const { esAdmin } = useAuthContext();

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [reservaAEliminar, setReservaAEliminar] = useState(null);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        setCargando(true);
        setError("");
        const res = await fetch(API_RESERVAS);

        if (!res.ok) throw new Error("Error HTTP " + res.status);

        const datos = await res.json();
        setReservas(datos);
      } catch (e) {
        console.error("Error al cargar reservas:", e);
        setError("Hubo un problema al cargar las reservas.");
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!nombre || !correo || !fecha || !hora) {
      setMensaje("Completá nombre, correo, fecha y hora para reservar.");
      return;
    }

    const nuevaReserva = {
      nombre,
      correo,
      fecha,
      hora,
      comentario,
    };

    try {
      const res = await fetch(API_RESERVAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReserva),
      });

      if (!res.ok) throw new Error("Error al crear reserva");

      const reservaCreada = await res.json();
      setReservas((prev) => [...prev, reservaCreada]);
      setMensaje("¡Tu cita fue reservada!");

      setNombre("");
      setCorreo("");
      setFecha("");
      setHora("");
      setComentario("");
    } catch (e) {
      console.error("Error al reservar:", e);
      setError("Hubo un problema al reservar. Intentalo de nuevo.");
    }
  };


  const abrirModalEliminar = (reserva) => {
    if (!esAdmin) {
      alert("Solo el administrador puede cancelar reservas.");
      return;
    }
    setReservaAEliminar(reserva);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setReservaAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!reservaAEliminar) return;

    try {
      setError("");
      const res = await fetch(`${API_RESERVAS}/${reservaAEliminar.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al cancelar reserva");

      setReservas((prev) =>
        prev.filter((r) => r.id !== reservaAEliminar.id)
      );
    } catch (e) {
      console.error("Error al cancelar:", e);
      setError("No se pudo cancelar la reserva.");
    } finally {
      cerrarModalEliminar();
    }
  };

  return (
    <div className="reservas-page">
      <h2>Reservar cita</h2>
      <p className="reservas-sub">
        Elegí día y horario para tu próxima visita a <strong>Tu Restaurante Favorito</strong>.
      </p>

      <div className="reservas-wrapper">
        <form className="reservas-form" onSubmit={manejarSubmit}>
          <label>
            Nombre
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tuemail@ejemplo.com"
            />
          </label>

          <div className="reservas-row">
            <label>
              Fecha
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </label>

            <label>
              Hora
              <input
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </label>
          </div>

          <label>
            Comentario (opcional)
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ej: mesa cerca de la ventana, reunión de trabajo, etc."
              rows={3}
            />
          </label>

          {mensaje && <p className="reservas-msg">{mensaje}</p>}
          {error && (
            <p className="reservas-msg" style={{ color: "crimson" }}>
              {error}
            </p>
          )}

          <button type="submit" className="general-button-nad">
            Reservar
          </button>
        </form>

        <div className="reservas-lista">
          <h3>Próximas reservas</h3>

          {cargando && <p>Cargando reservas...</p>}

          {!cargando && reservas.length === 0 && (
            <p className="reservas-empty">Todavía no hay reservas.</p>
          )}

          {!cargando && reservas.length > 0 && (
            <ul>
              {reservas.map((reserva) => (
                <li key={reserva.id}>
                  <strong>{reserva.nombre}</strong>
                  <span>
                    {reserva.fecha} – {reserva.hora}
                  </span>
                  {reserva.correo && (
                    <small>
                      <br />
                      Correo: {reserva.correo}
                    </small>
                  )}
                  {reserva.comentario && <small>{reserva.comentario}</small>}

                  {esAdmin && (
                    <button
                      type="button"
                      className="general-button-nad btn-eliminar-nad"
                      onClick={() => abrirModalEliminar(reserva)}
                    >
                      Cancelar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


      {mostrarModalEliminar && (
        <div className="nad-modal-overlay">
          <div className="nad-modal">
            <h3>¿Seguro que querés cancelar esta reserva?</h3>
            <p>
              {reservaAEliminar?.nombre} – {reservaAEliminar?.fecha}{" "}
              {reservaAEliminar?.hora}
            </p>
            <div className="nad-modal-buttons">
              <button
                className="general-button-nad nad-btn-secondary"
                onClick={cerrarModalEliminar}
              >
                Volver
              </button>
              <button
                className="general-button-nad nad-btn-danger"
                onClick={confirmarEliminar}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Destacados />
    </div>
  );
};

export default Reservas;