//1 Crear un componente para listar los productos disponibles.
//7 Integración con una API.
//9 Manejo de efectos secundarios con useEffect.
//10 Estado de carga y errores al cargar productos.
//14 Estado de carga y manejo de errores.
// Importo Destacados Swiper.

import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useProductosContext } from "../context/ProductosContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import Destacados from "../Pages/Destacados.jsx";
import { toast } from "react-toastify";
import Buscador from "./Buscador.jsx";
import Paginacion from "./Paginacion.jsx";

const Productos = () =>  {
  const { productos, cargando, error } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { busqueda } = useSearch();

  const texto = busqueda.toLowerCase().trim();

  const productosFiltrados = productos.filter((producto) => {
    if (!texto) return true;

    const titulo = producto.title?.toLowerCase() || "";
    const descripcion = producto.description?.toLowerCase() || "";
    const categoria = producto.category?.toLowerCase() || "";

    return (
      titulo.includes(texto) ||
      descripcion.includes(texto) ||
      categoria.includes(texto)
    );
  });

  const handlePedir = (producto) => {
    agregarAlCarrito(producto);
    toast.success("Producto agregado al carrito!", {
      icon: "☕",
    });
  };

  
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  
  useEffect(() => {
    setPaginaActual(1);
  }, [texto, productos.length]);

  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);

  if (error) return <p>{error}</p>;
  if (cargando) return <p>Estamos cargando sus productos...</p>;

  return (
      <div className="productos-container-nad">
        <Destacados />
        <h2 className="destacados-title">Todos nuestros productos</h2>

        <Buscador
          label="Buscá por nombre, descripción o categoría"
          placeholder="Buscar cafés, combos, etc..."
        />

        <ul className="productos-lista-nad">
          {productosFiltrados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            productosPagina.map((producto) => (
              <li className="producto-item-nad" key={producto.id}>
                <img
                  className="producto-img-nad"
                  src={producto.image}
                  alt={producto.title}
                />
                <h3 className="producto-nombre-nad">{producto.title}</h3>
                <p className="producto-descripcion-nad">
                  {producto.description}
                </p>
                <p className="producto-precio-nad">${producto.price}</p>
                <div className="producto-botonera-nad">
                  <button
                    className="general-button-nad"
                    onClick={() => handlePedir(producto)}
                  >
                    Pedir
                  </button>
                  <Link
                    className="general-button-nad"
                    to={`/productos/${producto.id}`}
                  >
                    Ver mas
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
        {productosFiltrados.length > 0 && (
          <Paginacion
            totalItems={productosFiltrados.length}
            itemsPerPage={productosPorPagina}
            currentPage={paginaActual}
            onPageChange={setPaginaActual}
          />
        )}
      </div>
  );
};

export default Productos;