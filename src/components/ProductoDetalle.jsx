//13 Navegar entre productos
//14 Estado de carga y manejo de errores.
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { toast } from "react-toastify";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);

  const handlePedir = () => {
    agregarAlCarrito(producto);
    toast.success("Producto agregado al carrito", {
      icon: "☕",
    });
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await fetch(
          `https://68def7d5898434f41356757f.mockapi.io/productos/${id}`
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el producto");
        }

        const dato = await respuesta.json();
        setProducto(dato);
      } catch (err) {
        setError(err.message || "Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) return <p>Cargando ......</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <>
      <h2 className="detalle-titulo-nad">{producto.title}</h2>
      <div className="detalle-nad">
        <div className="detalle-img-nad" key={producto.id}>
          <img
            src={producto.image}
            alt={producto.title}
            className="detalle-img2-nad"
          />
        </div>

        <div className="detalle-datos-nad">
          <h4 className="detalle-recipe-title">Notas del barista</h4>
          <p className="detalle-recipe-nad">{producto.recipe}</p>

          <div className="contenedorx2Nad">
            <button
              className="general-button-nad"
              onClick={handlePedir}
            >
              Pedir
            </button>
            <p className="detalle-precio-nad">
              ${producto.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductoDetalle;