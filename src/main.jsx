import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <ProductosProvider>
            <CarritoProvider>
              <App />
            </CarritoProvider>
          </ProductosProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);