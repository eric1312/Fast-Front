import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import fondo from "../assets/fondo-pagina-inicio.jpg";
import tienda from "../assets/tiendanad.png";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1606755962775-9fcf4f0f3b6a?auto=format&fit=crop&w=1400&q=60",
    alt: "Cafes",
    caption: "Tiendas de Cafes",
    fallback: tienda,
  },
  {
    src: "https://images.unsplash.com/photo-1548365328-9b6e6f3b6e8a?auto=format&fit=crop&w=1400&q=60",
    alt: "Fast",
    caption: "Fast",
    fallback: fondo,
  },
  {
    src: "https://images.unsplash.com/photo-1542452255191-c4e7c30a0b6e?auto=format&fit=crop&w=1400&q=60",
    alt: "Pizza",
    caption: "RestoBares",
    fallback: tienda,
  },
  {
    src: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=60",
    alt: "Flores",
    caption: "Ramos y detalles",
    fallback: fondo,
  },
];

const BannerCarousel = () => {
  const handleImgError = (e, fallback) => {
    if (fallback && e.target.src !== fallback) {
      e.target.src = fallback;
    }
  };

  return (
    <section className="banner-carousel container-nad">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="banner-swiper"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx} className="banner-slide">
            <img src={s.src} alt={s.alt} onError={(e) => handleImgError(e, s.fallback)} />
            <div className="banner-overlay">
              <h2>{s.caption}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerCarousel;