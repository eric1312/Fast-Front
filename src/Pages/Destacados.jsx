// Implemento API Swiper para destacados
// Se toma los últimos 8 productos como "destacados"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { useProductosContext } from "../context/ProductosContext.jsx";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { toast } from "react-toastify";

const Destacados = () => {
  const { productos } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const destacados =
    productos && productos.length > 0
      ? [...productos].slice(-10).reverse()
      : [];

  const handlePedir = (producto) => {
    agregarAlCarrito(producto);
    toast.success("Producto agregado al carrito!", {
      icon: "/imagenes Fast/comida-rapida.png",
    });
  };

  return (
    <div className="container-nad">
      <section className="destacados-container">
        <h2 className="destacados-title">Destacados</h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop={true}
          slidesPerView={1.2}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          centeredSlides={true}
          breakpoints={{
            600: { slidesPerView: 2.2 },
            900: { slidesPerView: 3.2 },
            1200: { slidesPerView: 4 },
          }}
          className="destacados-swiper"
        >
          {destacados.map((producto) => (
            <SwiperSlide key={producto.id}>
              <article className="destacado-card">
                <div className="badge-nuevo">Nuevo</div>

                <div>
                  <img
                    src={producto.image}
                    alt={producto.title}
                    className="producto-img-nad"
                  />
                </div>

                <h3 className="producto-nombre-nad">{producto.title}</h3>
                <p className="producto-precio-nad">${producto.price}</p>

                <div className="producto-botonera-nad">
                  <button
                    className="general-button-nad"
                    onClick={() => handlePedir(producto)}
                  >
                    Pedir
                  </button>

                  <Link
                    to={`/productos/${producto.id}`}
                    className="general-button-nad"
                  >
                    Ver más
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Destacados;