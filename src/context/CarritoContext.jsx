import { createContext, useState } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);


  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);

      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      }

      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };


  const restarDelCarrito = (id) => {
    setCarrito((prevCarrito) => {
      const producto = prevCarrito.find((item) => item.id === id);
      if (!producto) return prevCarrito;

      if ((producto.cantidad || 1) <= 1) {
        return prevCarrito.filter((item) => item.id !== id);
      }

      return prevCarrito.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );
    });
  };


  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        restarDelCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}