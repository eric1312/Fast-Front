//11 Implementación de rutas estaticas.
// Importo Destacados Swiper.
import Destacados from "./Destacados";
const Novedades = () => {
  const posts = [
    {
      mes: "Nov",
      titulo: "Nuevo blend de la casa",
      texto: "Lanzamos una mezcla especial con notas de chocolate y frutos rojos.",
    },
    {
      mes: "Dic",
      titulo: "Edición limitada de tazas",
      texto: "Tazas de cerámica hechas a mano, ideales para regalo.",
    }
  ];

  return (
    <section className="nad-page">
      <p className="nad-intro">Lo último que está pasando en TIENDA Fast.</p>

      <div className="nad-lista">
        {posts.map((n, i) => (
          <article key={i} className="nad-card">
            <div className="nad-mes">{n.mes}</div>
            <div className="nad-info">
              <h3>{n.titulo}</h3>
              <p>{n.texto}</p>
            </div>
          </article>
        ))}
      </div>
      <Destacados />
    </section>
  );
};

export default Novedades;
