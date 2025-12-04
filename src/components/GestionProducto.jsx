// src/components/GestionProducto.jsx
import { useState, useEffect } from "react";
import FormProducto from "./FormProducto.jsx";
import { useProductosContext } from "../context/ProductosContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import Buscador from "./Buscador.jsx";
import Paginacion from "./Paginacion.jsx";

const GestionProductos = () => {
  const { productos, eliminarProducto } = useProductosContext();
  const { busqueda } = useSearch();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };


  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setProductoAEliminar(null);
  };

  const confirmarEliminar = () => {
    if (productoAEliminar) {
      eliminarProducto(productoAEliminar.id);
    }
    cerrarModalEliminar();
  };

  const texto = busqueda.toLowerCase().trim();

  const productosFiltrados = productos.filter((producto) => {
    if (!texto) return true;

    const id = String(producto.id || "").toLowerCase();
    const titulo = producto.title?.toLowerCase() || "";
    const descripcion = producto.description?.toLowerCase() || "";
    const categoria = producto.category?.toLowerCase() || "";

    return (
      id.includes(texto) ||
      titulo.includes(texto) ||
      descripcion.includes(texto) ||
      categoria.includes(texto)
    );
  });


  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 12; 

  useEffect(() => {
    setPaginaActual(1);
  }, [texto, productos.length]);

  const indiceUltimo = paginaActual * itemsPorPagina;
  const indicePrimero = indiceUltimo - itemsPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimero, indiceUltimo);

  return (
    <div className="productos-container-nad">
      <div className="gestor-header-nad">
        <div>
          <h2>Gestor de Productos</h2>
          <p>Administrá los productos que se muestran en tu tienda Nad.</p>
        </div>
        <button
          onClick={abrirFormularioAgregar}
          className="general-button-nad gestor-add-btn-nad"
        >
          + Agregar Producto
        </button>
      </div>

      <Buscador
        label="Filtrar productos por ID, nombre, descripción o categoría"
        placeholder="Buscar en el gestor..."
      />

      <div>
        {productos.length === 0 ? (
          <p className="productos-empty-nad">
            No hay productos cargados todavía. Empezá agregando el primero.
          </p>
        ) : productosFiltrados.length === 0 ? (
          <p className="productos-empty-nad">
            No hay productos que coincidan con la búsqueda.
          </p>
        ) : (
          <>
            <ul className="productos-lista-nad">
              {productosPagina.map((producto) => (
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
                      onClick={() => abrirFormularioEditar(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="general-button-nad btn-eliminar-nad"
                      onClick={() => abrirModalEliminar(producto)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <Paginacion
              totalItems={productosFiltrados.length}
              itemsPerPage={itemsPorPagina}
              currentPage={paginaActual}
              onPageChange={setPaginaActual}
            />
          </>
        )}
      </div>


      {mostrarForm && (
        <FormProducto
          productoInicial={productoSeleccionado || {}}
          modo={modoFormulario}
          onCerrar={cerrarFormulario}
        />
      )}


      {mostrarModalEliminar && (
        <div className="nad-modal-overlay">
          <div className="nad-modal">
            <h3>¿Seguro que querés eliminar este producto?</h3>
            <p>
              {productoAEliminar?.title} (ID: {productoAEliminar?.id})
            </p>
            <div className="nad-modal-buttons">
              <button
                className="general-button-nad nad-btn-secondary"
                onClick={cerrarModalEliminar}
              >
                Cancelar
              </button>
              <button
                className="general-button-nad nad-btn-danger"
                onClick={confirmarEliminar}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionProductos;