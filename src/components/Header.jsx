// src/components/Header.jsx
import MenuDropdown from "./MenuDropdown.jsx";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext.jsx";
import BagIcon from "../assets/BagIcon.jsx";

function Header() {
  const { carrito } = useContext(CarritoContext);
  const contadorEnCarrito = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header-nad">
      <div className="header-bar">
        {/* IZQUIERDA: logo */}
        <div className="header-brand">
          <Link to="/" className="brand-text" onClick={closeMenu}>
            FAST
          </Link>
        </div>

        {/* DERECHA: hamburguesa + carrito SIEMPRE visibles */}
        <div className="header-icons">
          <button 
            className={`hamburger-nad ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/carrito" onClick={closeMenu}>
            <button className="general-button-nad btn-cart-nad">
              <BagIcon className="icon-cart-nad" />
              {contadorEnCarrito > 0 && (
                <span className="cart-count-nad">{contadorEnCarrito}</span>
              )}
            </button>
          </Link>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE DENTRO DEL BOTÓN HAMBURGUESA */}
      <MenuDropdown isOpen={menuOpen} onClose={closeMenu} />
    </header>
  );
}

export default Header;
