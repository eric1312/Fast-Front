// src/components/Buscador.jsx
import { useSearch } from "../context/SearchContext.jsx";

const Buscador = ({
  placeholder = "Buscar...",
  label = "",
  className = "",
}) => {
  const { busqueda, setBusqueda } = useSearch();

  return (
    <div className={`buscador-nad ${className}`}>
      {label && <label className="buscador-label-nad">{label}</label>}

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder={placeholder}
        className="buscador-input-nad"
      />
    </div>
  );
};

export default Buscador;