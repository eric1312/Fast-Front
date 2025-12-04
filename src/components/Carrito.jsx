import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    restarDelCarrito,
    agregarAlCarrito,
    vaciarCarrito,
  } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handleVaciar = () => {
    vaciarCarrito();
    toast.info("Carrito vaciado", { icon: "🧹" });
  };

  const handleFinalizarCompra = () => {
    if (carrito.length === 0) {
      toast.error("El carrito está vacío", { icon: "⚠️" });
      return;
    }

    toast.loading("Procesando compra...", { toastId: "compra" });

    setTimeout(() => {
      toast.update("compra", {
        render: "¡Compra realizada con éxito!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        icon: "🧾",
      });

      vaciarCarrito();
      setTimeout(() => {
        navigate("/gracias");
      }, 700);
    }, 2000);
  };

  const totalCarrito = carrito.reduce(
    (acc, p) => acc + Number(p.price) * (p.cantidad || 1),
    0
  );

  return (
    <div className="carrito-container-nad">
      <h2>Carrito</h2>

      <ul className="carrito-lista-nad">
        {carrito.map((producto) => (
          <div key={producto.id}>
            <li className="carrito-card">
              <div className="carrito-img-box">
                <img src={producto.image} alt={producto.title} />
              </div>

              <div className="carrito-info">
                <h3>{producto.title}</h3>
                <p className="carrito-desc">{producto.description}</p>

                <p className="carrito-price">
                  ${producto.price} x {producto.cantidad}
                </p>
                <p className="carrito-subtotal">
                  Subtotal: $
                  {Number(producto.price) * (producto.cantidad || 1)}
                </p>

                <div className="carrito-controles">
                  <button
                    className="carrito-cantidad-btn"
                    onClick={() => restarDelCarrito(producto.id)}
                  >
                    −
                  </button>
                  <span className="carrito-cantidad">
                    {producto.cantidad}
                  </span>
                  <button
                    className="carrito-cantidad-btn"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="carrito-delete"
                  onClick={() => eliminarDelCarrito(producto.id)}
                >
                  ✕
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>

      <div className="carrito-total">
        <p>Total: ${totalCarrito}</p>

        <div className="producto-botonera-nad">
          <button className="btn-comprar-nad" onClick={handleFinalizarCompra}>
            Finalizar compra
          </button>

          <button className="btn-comprar-nad" onClick={handleVaciar}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;