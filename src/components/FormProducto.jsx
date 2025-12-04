// src/components/FormProducto.jsx
import { useEffect, useState } from "react";
import { useProductosContext } from "../context/ProductosContext.jsx";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  const { agregarProducto, editarProducto } = useProductosContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (modo === "editar" && productoInicial) {
      setFormData({
        title: productoInicial.title || "",
        description: productoInicial.description || "",
        price: productoInicial.price || "",
        image: productoInicial.image || "",
      });
    }
  }, [modo, productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (modo === "editar") {
      // Editar producto existente
      editarProducto({
        ...productoInicial,
        ...formData,
      });
    } else {
      // Agregar producto nuevo
      agregarProducto(formData);
    }

    onCerrar();
  };

  return (
    <div className="form-producto-overlay-nad" onClick={onCerrar}>
      <div
        className="form-producto-modal-nad"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="form-producto-header-nad">
          <div>
            <h3>
              {modo === "editar" ? "Editar producto" : "Agregar producto"}
            </h3>
            <p>
              Completá los datos del producto. Podés modificarlos cuando
              quieras.
            </p>
          </div>
          <button
            type="button"
            className="form-producto-close-nad"
            onClick={onCerrar}
          >
            ×
          </button>
        </header>

        <form className="form-producto-body-nad" onSubmit={manejarEnvio}>
          <div className="form-producto-grid-nad">
            <div className="form-producto-group-nad">
              <label htmlFor="title">Nombre</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Espresso Nad"
                required
              />
            </div>

            <div className="form-producto-group-nad">
              <label htmlFor="price">Precio</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-producto-group-nad">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Breve descripción del producto..."
              rows={3}
            />
          </div>

          <div className="form-producto-group-nad">
            <label htmlFor="image">URL de imagen</label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <footer className="form-producto-footer-nad">
            <button
              type="button"
              className="general-button-nad form-producto-btn-sec"
              onClick={onCerrar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="general-button-nad form-producto-btn-main"
            >
              {modo === "editar" ? "Guardar cambios" : "Agregar"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default FormProducto;