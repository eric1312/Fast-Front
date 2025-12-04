// src/Pages/Gracias.jsx
import { Link } from "react-router-dom";

const Gracias = () => {
  return (
    <div className="gracias-container-nad">
      <div className="gracias-card-nad">
        <div className="gracias-confetti-layer"></div>

        <div className="gracias-icon-wrap">
          <div className="gracias-icon-circle">
            <span className="gracias-icon">☕</span>
          </div>
        </div>

        <h1 className="gracias-title">¡Gracias por tu compra!</h1>
        <p className="gracias-text">
          Tu pedido está siendo preparado con dedicación por nuestro equipo de baristas.
          <br />
          En unos instantes vas a poder disfrutar de la experiencia Tienda Nad.
        </p>

        <div className="gracias-buttons">
          <Link to="/" className="gracias-btn">
            Volver al inicio
          </Link>
          <Link to="/" className="gracias-btn gracias-btn-secundario">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gracias;