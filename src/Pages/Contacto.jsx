//11 Implementación de rutas estaticas.

// Importo Destacados Swiper.
import Destacados from "./Destacados";

const Contacto = () => {
  return (
    <section className="contact-page">
      <h2>¿Querés saber más?</h2>
      <p className="contact-sub">
        Escribinos para más información de tu pedido 
      </p>

      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Tu correo
            <input type="email" placeholder="tucorreo@correo.com" required />
          </label>

          <label>
            Mensaje
            <textarea
              rows="4"
              placeholder="Contanos en qué podemos ayudarte"
              required
            ></textarea>
          </label>

          <button className="general-button-nad" type="submit">Enviar</button>
        </form>
      </div>
    <Destacados />
    </section>
  );
};

export default Contacto;
