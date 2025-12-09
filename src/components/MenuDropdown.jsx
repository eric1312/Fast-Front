import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const MenuDropdown = ({ isOpen, onClose }) => {
  const { usuario, logout } = useAuthContext();
  const esAdmin = usuario?.rol === "admin";

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Eventos", path: "/eventos" },
    { name: "Novedades", path: "/novedades" },
    { name: "Reservas", path: "/reservas" },
    { name: "Contacto", path: "/contacto" },
    { name: "Destacados", path: "/destacados" },
  ];

  const handleClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="menu-dropdown">
      <div className="menu-dropdown-content">
        {/* Links de navegación */}
        <nav className="dropdown-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="dropdown-link"
              onClick={handleClick}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin solo si es admin */}
          {esAdmin && (
            <Link
              to="/admin"
              className="dropdown-link dropdown-link-admin"
              onClick={handleClick}
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Separador */}
        <div className="dropdown-divider"></div>

        {/* Botón de autenticación */}
        <div className="dropdown-auth">
          {usuario ? (
            <button
              className="dropdown-logout-btn"
              onClick={() => {
                logout();
                handleClick();
              }}
            >
              Cerrar Sesión
            </button>
          ) : (
            <Link to="/login" onClick={handleClick}>
              <button className="dropdown-login-btn">Ingresá</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
