Login
Lo correcto es tener 3 tipos de accesos:
    1. Cliente final
        Hace pedidos
        Ve historial
        Administra su perfil
    2. Rider (repartidor)
        Ve pedidos asignados
        Marca entregados
        Ver ganancias por día
    3. Comercio (dueño)
        Admin panel
        Ve pedidos del día
        Administra productos
        Maneja estado del comercio
        Puede tener subusuarios internos (empleados del local)

El dueño siempre debe entrar como “comercio”.

Tenés dos opciones:
    Opción A — Un único login para el comercio
    El dueño accede con:
        email del comercio
        contraseña del comercio
    Y dentro del panel definís roles internos:
        admin → dueño
        empleado → solo puede ver pedidos
        manager → puede editar productos

  Opción B — Cada persona del comercio tiene su usuario
    Estructuras tu tabla así:
      Tabla: comercio_usuarios
      | id | comercio_id | nombre | email | rol | password |
    Roles:
      dueño
      empleado
      gerente

Más profesional
Escalable
Útil si el local tiene más empleados


**Fast-Front** es una solución completa para el desarrollo frontend moderno, diseñada para acelerar la creación de interfaces web responsivas, eficientes y escalables.

## ✨ Características Principales

### 🏗️ **Arquitectura Modular**
- Estructura de proyecto organizada y escalable
- Componentes reutilizables con documentación integrada
- Configuración preestablecida para diferentes tipos de proyectos

### ⚡ **Rendimiento Optimizado**
- Bundling automático con code splitting
- Lazy loading de componentes y rutas
- Optimización de assets (imágenes, fuentes, estilos)
- Puntuación Lighthouse superior a 90/100

### 🎨 **Estilización Avanzada**
- Sistema de diseño configurable (tokens, temas, variables CSS)
- Soporte para múltiples preprocesadores (Sass, Less, Stylus)
- Utilidades CSS-in-JS integradas
- Diseño responsivo móvil-first

### 🔧 **Desarrollo Experiencia**
- Hot Module Replacement (HMR) en tiempo real
- Linting y formatting preconfigurados
- Testing suite integrado (unit, integration, e2e)
- TypeScript soportado de forma nativa
- Generadores de componentes automatizados

### 📱 **Compatibilidad Multiplataforma**
- Progressive Web App (PWA) ready
- Soporte para SSR/SSG
- Compatibilidad cross-browser
- Optimización para SEO

## 🚀 **Comienza Rápidamente**

### Prerrequisitos
- Node.js 16+ 
- npm 7+ o yarn 1.22+

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/eric1312/Fast-Front.git

# Navega al directorio
cd Fast-Front

# Instala dependencias
npm install
# o
yarn install