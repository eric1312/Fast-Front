//2 Usar el hook useState para manejar el estado del carrito.
//3 Implementar un evento de clic que permita agregar y eliminar productos al carrito.
//4 Mostrar el carrito con los productos seleccionados en otro componente.
//5 Tener por separado el componente Producto del componente Carrito como se explico en la clase de consulta. 
//8 Gestión del estado con useState.

import Productos from '../components/Productos.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import FondoPaginaInicio from '../assets/fondo-pagina-inicio.jpg';

const Inicio = () => {
  

  return(
    <>
      <img className="img-hero-nad"
        src={FondoPaginaInicio} 
        alt="Comercio. Estilo. Experiencia." 
      />
      <Productos/>
      <WhatsAppButton />
    </>
    
  );

  
}

export default Inicio;