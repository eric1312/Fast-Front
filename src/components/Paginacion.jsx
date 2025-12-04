// src/components/Paginacion.jsx
const Paginacion = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <div className="paginacion-nad">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`paginacion-nad-btn ${
              page === currentPage ? "paginacion-nad-btn-activa" : ""
            }`}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Paginacion;