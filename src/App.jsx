// 6 Crear un Layout del eCommerce.
// Header, dentro de este el Navbar y el footer, esto mínimo.

import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import Carrito from './components/Carrito.jsx';
import Contacto from './Pages/Contacto.jsx';
import Eventos from './Pages/Eventos.jsx';
import Novedades from './Pages/Novedades.jsx';
import Inicio from './Pages/Inicio.jsx';
import ProductoDetalle from './components/ProductoDetalle.jsx';
import Footer from './components/Footer.jsx';
import RutaProtegida from "./components/RutaProtegida.jsx";
import Login from "./Pages/Login.jsx";
import Admin from "./Pages/Admin.jsx";
import Reservas from "./Pages/Reservas.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gracias from "./Pages/Gracias.jsx";

function App() {
  return (
 <div className="layout-nad">
        <Header />
      <main className="main-nad">
        <div className="container-nad">
        <ToastContainer
          position="top-right"
          autoClose={1800}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"

          toastStyle={{
            background: "#4E342E",
            color: "#FFF",
            fontFamily: "Poppins, sans-serif",
            borderRadius: "10px",
            border: "1px solid #6D4C41",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.25)"
          }}

          progressStyle={{
            background: "#FFCC80"
          }}
        />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path='/productos/:id' element={<ProductoDetalle />}/>
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/carrito" element={
                <RutaProtegida >
                  <Carrito />
                </RutaProtegida>}/>
        <Route path="/admin" element={
                <RutaProtegida >
                  <Admin />
                </RutaProtegida>}/>
      </Routes>
        </div>
      </main>

      <Footer />

    </div>
  );
}
export default App