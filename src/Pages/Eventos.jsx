// Importo Destacados Swiper.
import Destacados from "./Destacados";
const Eventos = () => {
  const eventos = [
    {
      mes: "Mar",
      titulo: "Cata de cafés de origen",
      descripcion: "Probá distintos orígenes latinoamericanos guiado por nuestro barista.",
      estado: "Próximamente"
    },
    {
      mes: "Abr",
      titulo: "Noche de café y jazz",
      descripcion: "Música en vivo, luz tenue y cafés de especialidad.",
      estado: "Planeando"
    },
    {
      mes: "May",
      titulo: "Taller de arte latte",
      descripcion: "Aprendé a hacer corazones y figuras en tu café.",
      estado: "Cupos limitados"
    }
  ];

  return (
    <section className="nad-page">
      <p className="nad-intro">
        Enterate de las próximas actividades en Fast.
      </p>

      <div className="nad-lista">
        {eventos.map((ev, i) => (
          <article key={i} className="nad-card">
            <div className="nad-mes">{ev.mes}</div>
            <div className="nad-info">
              <h3>{ev.titulo}</h3>
              <p>{ev.descripcion}</p>
              <span className="nad-estado">{ev.estado}</span>
            </div>
          </article>
        ))}
      </div>
    <Destacados />
    </section>
  );
};

export default Eventos;
